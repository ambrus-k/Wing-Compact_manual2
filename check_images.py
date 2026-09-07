import urllib.request
files = [
  "Shure_SM58.jpg", 
  "Shure_SM57_microphone.jpg", 
  "Neumann_U87.jpg", 
  "AKG-C414-front.jpg", 
  "Sennheiser_md421.jpg",
  "Electro-Voice_RE20.jpg",
  "Rode_NT1-A.jpg",
  "Shure_Beta_52A.jpg",
  "AKG_D112.jpg"
]
for f in files:
    url = f"https://commons.wikimedia.org/wiki/Special:FilePath/{f}"
    try:
        req = urllib.request.Request(url, method="HEAD", headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req)
        print(f"[OK] {f} -> {res.geturl()}")
    except Exception as e:
        print(f"[FAIL] {f} -> {e}")
