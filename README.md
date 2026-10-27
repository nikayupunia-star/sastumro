# სასტუმროს პლატფორმა — Aurora Hotels + Lodgia

ორი საიტი ერთ პროექტში. React 18 · TypeScript · Vite · React Router v6 · Redux Toolkit · Formik · Yup · Framer Motion

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## მარშუტები
| მისამართი | რა არის |
|---|---|
| `/` | მთავარი — საიტის არჩევა |
| `/aurora`, `/aurora/rooms`, `/aurora/rooms/:roomId`, `/aurora/add-room` | **Aurora Hotels** (ოთახების კატალოგი) |
| `/lodgia`, `/lodgia/bookings`, `/lodgia/bookings/:bookingId` | **Lodgia** (პაკეტები / ბარათები) |

## სტრუქტურა — რატომ არ ხდება git-ზე კონფლიქტი
```
src/
  main.tsx, App.tsx        საერთო shell (თითქმის არასდროს იცვლება)
  shared/                  Hub გვერდი, store, registry (ავტომატურად პოულობს მოდულებს)
  modules/
    aurora/                ← Aurora-ს ავტორი მუშაობს მხოლოდ აქ
    lodgia/                ← Lodgia-ს ავტორი მუშაობს მხოლოდ აქ
tools/postcss-scope-modules.mjs
```

- ყველა ფაილი საკუთარ `src/modules/<სახელი>/` საქაღალდეშია — ორი ადამიანი ერთსა და იმავე ფაილს არ ეხება.
- **CSS ავტომატურად იზოლირდება:** `modules/aurora/aurora.css` ჩვეულებრივად წერია (`.btn`, `.grid`, `:root`, `body`...), მაგრამ build-ზე ყველა სელექტორს ემატება `.aurora-root` (Lodgia-სთვის `.lodgia-root`). ამიტომ `.btn` ერთისა მეორეს არ აფუჭებს.
- **Redux:** Aurora → `state.rooms`, Lodgia → `state.bookings`. store-ს ააწყობს `shared/store.ts` მოდულების `reducers`-ისგან.
- **ახალი საიტის დამატება:** შექმენი `src/modules/<name>/index.ts` (იხილე `aurora/index.ts`) — `App.tsx` და `store.ts` აღარ შეიცვლება.
- ბმულებისთვის გამოიყენე `p("/rooms")` (`modules/<name>/routes.ts`), რომ პრეფიქსი (`/aurora`) ავტომატურად დაემატოს.

## git-ის რჩევები
- თითო საქაღალდეში მუშაობა = კონფლიქტი არ გექნებათ. საერთო ფაილებია: `package.json`, `package-lock.json`, `src/shared/*`, `src/App.tsx`.
- თუ ორივემ სხვადასხვა ბიბლიოთეკა დაამატა და `package-lock.json`-ზე კონფლიქტია: აიღეთ ნებისმიერი ვერსია (`git checkout --theirs package-lock.json`) და გაუშვით `npm install` — lock თავიდან დაგენერირდება.
