filenames=$(grep -r --include=\*.js --exclude-dir=node_modules 'localhost:3000' | cut -d':' -f1,1 | tr '\n' ' ')

for file in $filenames; do
  sed -Ei 's|http://localhost:3000|https://atom-low-ostrich.glitch.me|' $file
done
