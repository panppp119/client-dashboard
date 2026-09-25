# White-label Client Dashboard

Dashboard ที่จำลองระบบเปลี่ยน theme ตาม client แบบเดียวกับโมเดล white-label
ของแพลตฟอร์ม B2B SaaS — สร้างเพื่อฝึกและโชว์แนวคิด config-driven UI

## Live Demo
[https://client-dashboard-pan-ppp.vercel.app/](https://client-dashboard-pan-ppp.vercel.app/)

## Highlights
- Config-driven theming ผ่าน CSS variables — สลับ client ได้ทันทีโดยไม่ต้อง deploy ใหม่
- Debounced search, sortable + paginated table
- Loading/error/retry state สำหรับ async data พร้อม race-condition-safe fetch (AbortController)
- Unit test ครอบคลุม logic สำคัญ + CI pipeline (GitHub Actions)

## Tech Stack
React (Vite), Vitest + React Testing Library, GitHub Actions, deployed on Vercel

## รันโปรเจกต์
\`\`\`bash
npm install
npm run dev
\`\`\`

## รัน test
\`\`\`bash
npm run test
\`\`\`

## สิ่งที่ตั้งใจฝึก
- Performance: `useMemo` แยกชั้น sort/paginate ไม่ re-compute ซ้ำซ้อน
- Architecture: theme config แยกจาก component logic ชัดเจน ขยาย client ใหม่ได้โดยแก้ที่เดียว
- Correctness: ป้องกัน race condition ตอน fetch ด้วย AbortController