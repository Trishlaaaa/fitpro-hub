
import os
import subprocess

def run_cmd(cmd):
    print(f"Running: {cmd}")
    subprocess.run(cmd, shell=True, check=True)

base_dir = r"c:\Users\trish\Downloads\fitpro-hub-968\backend"
manage_py = os.path.join(base_dir, "manage.py")
python_cmd = os.path.join(base_dir, "venv", "Scripts", "python.exe")

if __name__ == "__main__":
    # Create migrations for 'core' app (where custom User model is)
    run_cmd(f'"{python_cmd}" "{manage_py}" makemigrations core')
    # Migrate database
    run_cmd(f'"{python_cmd}" "{manage_py}" migrate')
