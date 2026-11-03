$code = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
using System.Collections.Generic;

public class TurntableProcessor {
    public static void ProcessSingle(string inputPath, string outputPath, int cropX, int cropY, int cropW, int cropH, int targetW, int targetH, float contrast, float brightness, float gamma) {
        using (Bitmap src = new Bitmap(inputPath)) {
            using (Bitmap cropped = new Bitmap(targetW, targetH, PixelFormat.Format32bppArgb)) {
                using (Graphics g = Graphics.FromImage(cropped)) {
                    g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                    g.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighQuality;
                    g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
                    g.DrawImage(src, new Rectangle(0, 0, targetW, targetH), new Rectangle(cropX, cropY, cropW, cropH), GraphicsUnit.Pixel);
                }

                BitmapData data = cropped.LockBits(new Rectangle(0, 0, targetW, targetH), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
                int stride = Math.Abs(data.Stride);
                int totalBytes = stride * targetH;
                byte[] rgb = new byte[totalBytes];
                Marshal.Copy(data.Scan0, rgb, 0, totalBytes);

                int totalPixels = targetW * targetH;
                int[] labels = new int[totalPixels];
                int currentLabel = 1;
                Dictionary<int, int> componentSizes = new Dictionary<int, int>();
                HashSet<int> borderLabels = new HashSet<int>();

                int[] queue = new int[totalPixels];

                // BFS to find all connected black components (maxC <= 6)
                for (int y = 0; y < targetH; y++) {
                    for (int x = 0; x < targetW; x++) {
                        int idx = y * targetW + x;
                        if (labels[idx] != 0) continue;

                        int bIdx = y * stride + x * 4;
                        int maxC = Math.Max(rgb[bIdx], Math.Max(rgb[bIdx + 1], rgb[bIdx + 2]));

                        if (maxC <= 6) {
                            int qHead = 0, qTail = 0;
                            queue[qTail++] = idx;
                            labels[idx] = currentLabel;
                            int size = 0;
                            bool isBorder = false;

                            while (qHead < qTail) {
                                int curr = queue[qHead++];
                                size++;
                                int cx = curr % targetW;
                                int cy = curr / targetW;

                                if (cx == 0 || cx == targetW - 1 || cy == 0) {
                                    isBorder = true;
                                }

                                if (cx > 0) {
                                    int n = curr - 1;
                                    if (labels[n] == 0) {
                                        int nbIdx = cy * stride + (cx - 1) * 4;
                                        if (Math.Max(rgb[nbIdx], Math.Max(rgb[nbIdx + 1], rgb[nbIdx + 2])) <= 6) {
                                            labels[n] = currentLabel;
                                            queue[qTail++] = n;
                                        }
                                    }
                                }
                                if (cx < targetW - 1) {
                                    int n = curr + 1;
                                    if (labels[n] == 0) {
                                        int nbIdx = cy * stride + (cx + 1) * 4;
                                        if (Math.Max(rgb[nbIdx], Math.Max(rgb[nbIdx + 1], rgb[nbIdx + 2])) <= 6) {
                                            labels[n] = currentLabel;
                                            queue[qTail++] = n;
                                        }
                                    }
                                }
                                if (cy > 0) {
                                    int n = curr - targetW;
                                    if (labels[n] == 0) {
                                        int nbIdx = (cy - 1) * stride + cx * 4;
                                        if (Math.Max(rgb[nbIdx], Math.Max(rgb[nbIdx + 1], rgb[nbIdx + 2])) <= 6) {
                                            labels[n] = currentLabel;
                                            queue[qTail++] = n;
                                        }
                                    }
                                }
                                if (cy < targetH - 1) {
                                    int n = curr + targetW;
                                    if (labels[n] == 0) {
                                        int nbIdx = (cy + 1) * stride + cx * 4;
                                        if (Math.Max(rgb[nbIdx], Math.Max(rgb[nbIdx + 1], rgb[nbIdx + 2])) <= 6) {
                                            labels[n] = currentLabel;
                                            queue[qTail++] = n;
                                        }
                                    }
                                }
                            }

                            componentSizes[currentLabel] = size;
                            if (isBorder) borderLabels.Add(currentLabel);
                            currentLabel++;
                        }
                    }
                }

                // Any component connected to border OR size > 150 pixels is background!
                bool[] isBg = new bool[totalPixels];
                for (int y = 0; y < targetH; y++) {
                    for (int x = 0; x < targetW; x++) {
                        int idx = y * targetW + x;
                        int lbl = labels[idx];
                        if (lbl > 0) {
                            if (borderLabels.Contains(lbl) || componentSizes[lbl] > 150) {
                                isBg[idx] = true;
                            }
                        }
                    }
                }

                // Lookup table for color grading: Gamma 1.42, Contrast 1.14, Brightness +0.07
                byte[] lut = new byte[256];
                for (int i = 0; i < 256; i++) {
                    float v = (float)i / 255.0f;
                    v = (float)Math.Pow(v, 1.0f / gamma);
                    v = (v - 0.5f) * contrast + 0.5f + brightness;
                    v = Math.Max(0.0f, Math.Min(1.0f, v));
                    lut[i] = (byte)(v * 255.0f);
                }

                for (int y = 0; y < targetH; y++) {
                    for (int x = 0; x < targetW; x++) {
                        int idx = y * targetW + x;
                        int bIdx = y * stride + x * 4;

                        if (isBg[idx]) {
                            rgb[bIdx + 3] = 0;
                        } else {
                            bool borderNear = false;
                            if (x > 0 && isBg[idx - 1]) borderNear = true;
                            else if (x < targetW - 1 && isBg[idx + 1]) borderNear = true;
                            else if (y > 0 && isBg[idx - targetW]) borderNear = true;
                            else if (y < targetH - 1 && isBg[idx + targetW]) borderNear = true;

                            byte b = rgb[bIdx];
                            byte gCol = rgb[bIdx + 1];
                            byte r = rgb[bIdx + 2];

                            rgb[bIdx] = lut[b];
                            rgb[bIdx + 1] = lut[gCol];
                            rgb[bIdx + 2] = lut[r];

                            if (borderNear && Math.Max(r, Math.Max(gCol, b)) <= 18) {
                                rgb[bIdx + 3] = 160;
                            } else {
                                rgb[bIdx + 3] = 255;
                            }
                        }
                    }
                }

                Marshal.Copy(rgb, 0, data.Scan0, totalBytes);
                cropped.UnlockBits(data);
                cropped.Save(outputPath, ImageFormat.Png);
            }
        }
    }
}
"@

Add-Type -TypeDefinition $code -Language CSharp -ReferencedAssemblies "System.Drawing"

$srcDir = 'c:\Users\Administrator\Downloads\ezgif-72b991f2a17cce42-jpg'
$destDir = 'C:\Users\Administrator\Desktop\portfolio\3d Portfolio Website\assets\images\portrait-360'

if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }

$files = Get-ChildItem -Path $srcDir | Sort-Object Name

Write-Host "Starting batch generation of 36 frames..."
$sw = [System.Diagnostics.Stopwatch]::StartNew()

for ($i = 0; $i -lt $files.Count; $i++) {
    $pad = $i.ToString("D2")
    $outFile = Join-Path $destDir "frame-$pad.png"
    [TurntableProcessor]::ProcessSingle($files[$i].FullName, $outFile, 60, 300, 960, 1350, 540, 760, [float]1.14, [float]0.07, [float]1.42)
}

$sw.Stop()
Write-Host "Processed all $($files.Count) frames into assets/images/portrait-360/ in $($sw.ElapsedMilliseconds)ms!"
