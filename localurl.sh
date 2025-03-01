filenames=$(grep -r --include=\*.js --exclude-dir=node_modules 'atom-low-ostrich' | cut -d':' -f1,1 | tr '\n' ' ')

for file in $filenames; do
  sed -Ei 's|https://atom-low-ostrich.glitch.me|http://localhost:3000|' $file
done
