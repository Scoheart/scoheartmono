import {defineConfig} from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: "./lib/axios.js",
            name: "a",
            fileName: "axios"
        }
    }
})