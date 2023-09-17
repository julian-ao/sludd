
### SSH

in a terminal, run:

```
ssh <brukernavn>@it2810-02.idi.ntnu.no
```

### Build project

run in root directory:

```
pnpm build
```

### Copy build to SSH

run in root directory:

```
scp -r dist <brukernavn>@it2810-02.idi.ntnu.no:/tmp/
```

### Delete previous content

in ssh, run:

```
sudo rm -r /var/www/html/project1/dist
```

### Move project content in right folder

in ssh, run:
```
sudo mv /tmp/dist /var/www/html/project1
```