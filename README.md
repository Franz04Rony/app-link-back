# App Link Backend

##  Install
```
yarn install
```
```
docker compose up -d
```
```
yarn start:dev
```

## To do
- [x] Crear Entity para user y link
- [x] Relacionar user y link (uno a muchos)
- [x] Arreglar problema CORS
- [ ] Subir imágenes 

## Post method body for User - example:
```
{
    "name": "EnNvy",
    "perfilImage": "https://pm1.aminoapps.com/6286/cdd224097f6b9dc21306cd345d6d10199030a393_00.jpg",
    "links": [
        {
            "image": "https://cdn.static.linkr.bio/thumb/80x80/cover/85/static/linkr/icon/thumbnails/33.Reddit.png?f=webp",
            "label": "Reddit",
            "link": "https://www.reddit.com/r/MadokaMagica/"
        },
        {
            "image": "https://cdn.static.linkr.bio/thumb/80x80/cover/85/static/linkr/icon/thumbnails/9.YouTube.png?f=webp",
            "label": "Youtube",
            "link": "https://www.youtube.com/watch?v=Qmd0thZJlu8&t=2321s"
        },
        {
            "image": "https://cdn.static.linkr.bio/thumb/80x80/cover/85/static/linkr/icon/thumbnails/6.tiltok.png?f=webp",
            "label": "My awesome Tik tok",
            "link": "https://www.tiktok.com/es/"
        }
    ]
}
```