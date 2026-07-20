"""
Script to extract all image filenames from the images folder and its subfolders.
Saves the names to a text file.
"""

import os
import glob
from pathlib import Path
from datetime import datetime

def extract_image_names():
    """
    Recursively scan the 'images' folder for image files and save their names to a .txt file.
    """
    
    # Define the base directory (where this script is located)
    base_dir = Path(__file__).parent
    
    # Path to the images folder
    images_dir = base_dir / 'images'
    
    # Define image extensions to look for
    image_extensions = [
        '*.jpg', '*.jpeg', '*.png', '*.gif', '*.bmp', 
        '*.webp', '*.svg', '*.ico', '*.tiff', '*.tif',
        '*.JPG', '*.JPEG', '*.PNG', '*.GIF', '*.BMP', 
        '*.WEBP', '*.SVG', '*.ICO', '*.TIFF', '*.TIF'
    ]
    
    # Check if images directory exists
    if not images_dir.exists():
        print(f"Error: The folder '{images_dir}' does not exist.")
        print(f"Current directory: {base_dir}")
        return
    
    # Collect all image files recursively
    image_files = []
    
    for ext in image_extensions:
        # Use glob with recursive search
        pattern = str(images_dir / '**' / ext)
        files = glob.glob(pattern, recursive=True)
        image_files.extend(files)
    
    # Remove duplicates (if any) and sort
    image_files = sorted(set(image_files))
    
    if not image_files:
        print("No image files found in the 'images' folder or its subfolders.")
        return
    
    # Create output file path
    output_file = base_dir / 'image_names.txt'
    
    # Write image names to the text file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("=" * 60 + "\n")
        f.write("IMAGE NAMES EXTRACTED FROM images FOLDER\n")
        f.write("=" * 60 + "\n\n")
        f.write(f"Total images found: {len(image_files)}\n")
        f.write(f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write("-" * 60 + "\n\n")
        
        # Group by subfolder for better readability
        for img_path in image_files:
            relative_path = Path(img_path).relative_to(base_dir)
            f.write(f"{relative_path}\n")
    
    print(f"✅ Success! Found {len(image_files)} image files.")
    print(f"📄 Image names saved to: {output_file}")
    
    # Also create a summary showing how many images per subfolder
    print("\n📊 Summary by folder:")
    
    # Group by folder
    folder_counts = {}
    for img in image_files:
        folder = Path(img).parent
        folder_name = folder.name if folder.name != 'images' else 'root'
        folder_counts[folder_name] = folder_counts.get(folder_name, 0) + 1
    
    for folder, count in sorted(folder_counts.items()):
        print(f"   {folder}: {count} images")
    
    # Print sample of images found
    print("\n📸 Sample images (first 5):")
    for img in image_files[:5]:
        print(f"   {Path(img).name}")

# Run the function - FIXED: removed 'cd'
if __name__ == "__main__":
    extract_image_names()