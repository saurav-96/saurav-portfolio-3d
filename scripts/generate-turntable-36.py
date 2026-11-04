# scripts/generate-turntable-36.py
import math
import os
from PIL import Image

OUT_DIR = r'C:\Users\Administrator\Desktop\portfolio\3d Portfolio Website\assets\images\portrait-360'
os.makedirs(OUT_DIR, exist_ok=True)

def prepare_master(path, shift_y=0):
    img = Image.open(path).convert('RGBA')
    w, h = img.size
    canvas = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    canvas.paste(img, (0, -shift_y))
    scaled = canvas.resize((657, 1008), Image.Resampling.LANCZOS)
    return scaled

print("Loading master poses...")
m0 = Image.open(r'C:\Users\Administrator\Desktop\portfolio\3d Portfolio Website\assets\images\saurav-cutout.png').convert('RGBA')
m1 = prepare_master(r'C:\Users\Administrator\.gemini\antigravity\brain\cd22af7d-af27-43e1-a231-5c9921362c73\scratch\cutout_angle_1.png', 12)
m2 = prepare_master(r'C:\Users\Administrator\.gemini\antigravity\brain\cd22af7d-af27-43e1-a231-5c9921362c73\scratch\cutout_angle_2.png', 15)
m3 = prepare_master(r'C:\Users\Administrator\.gemini\antigravity\brain\cd22af7d-af27-43e1-a231-5c9921362c73\scratch\cutout_angle_3.png', 0)
m4 = prepare_master(r'C:\Users\Administrator\.gemini\antigravity\brain\cd22af7d-af27-43e1-a231-5c9921362c73\scratch\cutout_angle_4.png', 13)

# Key frame indexes for the 5 poses around the 36-frame circle
key_frames = [
    (0, m0),
    (7, m1),
    (14, m2),
    (21, m3),
    (28, m4),
    (36, m0)
]

def smoothstep(x):
    # Clamped smoothstep curve for natural interpolation
    x = max(0.0, min(1.0, x))
    return x * x * (3.0 - 2.0 * x)

frames = {}

for k in range(len(key_frames) - 1):
    f_start, img_start = key_frames[k]
    f_end, img_end = key_frames[k + 1]
    span = f_end - f_start

    for f in range(f_start, f_end):
        if f == f_start:
            frames[f] = img_start
        else:
            t = (f - f_start) / float(span)
            blend_weight = smoothstep(t)
            frames[f] = Image.blend(img_start, img_end, blend_weight)

print(f"Generated {len(frames)} frames. Writing to {OUT_DIR}...")
for i in range(36):
    fname = f"frame-{i:02d}.png"
    fpath = os.path.join(OUT_DIR, fname)
    # Optimize PNG compression for fast web loading
    frames[i].save(fpath, format='PNG', optimize=True)
    print(f"Saved {fname}")

print("All 36 turntable frames generated successfully!")
