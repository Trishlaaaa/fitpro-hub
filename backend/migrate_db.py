
import os
import sys
import subprocess

def run_cmd(cmd):
    print(f"Running: {cmd}")
    subprocess.run(cmd, shell=True, check=True)

# Use current directory
base_dir = os.path.dirname(os.path.abspath(__file__))
manage_py = os.path.join(base_dir, "manage.py")
python_cmd = sys.executable

if __name__ == "__main__":
    # Create migrations for 'core' app (where custom User model is)
    run_cmd(f'"{python_cmd}" "{manage_py}" makemigrations core')
    # Migrate database
    run_cmd(f'"{python_cmd}" "{manage_py}" migrate')
