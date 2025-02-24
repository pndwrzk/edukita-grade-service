# Menggunakan image Node.js versi terbaru dengan TypeScript
FROM node:23-alpine

# Set work directory di dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Menyalin seluruh file proyek ke dalam container
COPY . .

# Jalankan linter untuk memeriksa kode TypeScript dan compile TypeScript ke JavaScript
RUN npm run lint && npm run build



# Expose port aplikasi
EXPOSE 3000

# Perintah untuk menjalankan aplikasi
CMD ["npm", "run", "start"]
