# ApplyOnce — University Admin Credentials

> These are the seeded credentials for all 26 university admin accounts.
> Generated automatically when you run `npm run db:seed`.
> **Change passwords before going live.**

## Default Password (all accounts)

```
Admin@ApplyOnce1
```

## Demo Student Account

| Field | Value |
|---|---|
| Email | demo@applyonce.co.za |
| Password | Student@ApplyOnce1 |
| ID Number | 0001015009087 |

---

## All 26 University Admin Accounts

| University | Abbreviation | Login Email |
|---|---|---|
| University of Cape Town | UCT | admin@uct.applyonce.co.za |
| University of the Witwatersrand | Wits | admin@wits.applyonce.co.za |
| University of Pretoria | UP | admin@up.applyonce.co.za |
| Stellenbosch University | SU | admin@su.applyonce.co.za |
| University of Johannesburg | UJ | admin@uj.applyonce.co.za |
| University of KwaZulu-Natal | UKZN | admin@ukzn.applyonce.co.za |
| University of the Free State | UFS | admin@ufs.applyonce.co.za |
| North-West University | NWU | admin@nwu.applyonce.co.za |
| Nelson Mandela University | NMU | admin@nmu.applyonce.co.za |
| University of the Western Cape | UWC | admin@uwc.applyonce.co.za |
| Rhodes University | Rhodes | admin@rhodes.applyonce.co.za |
| University of South Africa | UNISA | admin@unisa.applyonce.co.za |
| Tshwane University of Technology | TUT | admin@tut.applyonce.co.za |
| Durban University of Technology | DUT | admin@dut.applyonce.co.za |
| Cape Peninsula University of Technology | CPUT | admin@cput.applyonce.co.za |
| Vaal University of Technology | VUT | admin@vut.applyonce.co.za |
| Central University of Technology | CUT | admin@cut.applyonce.co.za |
| Mangosuthu University of Technology | MUT | admin@mut.applyonce.co.za |
| University of Zululand | UniZulu | admin@unizulu.applyonce.co.za |
| University of Fort Hare | UFH | admin@ufh.applyonce.co.za |
| Walter Sisulu University | WSU | admin@wsu.applyonce.co.za |
| Sefako Makgatho Health Sciences University | SMU | admin@smu.applyonce.co.za |
| Sol Plaatje University | SPU | admin@spu.applyonce.co.za |
| University of Mpumalanga | UMP | admin@ump.applyonce.co.za |
| University of Limpopo | UL | admin@ul.applyonce.co.za |
| University of Venda | UNIVEN | admin@univen.applyonce.co.za |

---

## How the Admin Portal Login Works

1. Go to `http://localhost:3002` (dev) or `admin.applyonce.co.za` (production)
2. Enter the email for the university you want to log in as
3. Enter the default password `Admin@ApplyOnce1`
4. You land on that university's inbox — you only see applications submitted to that specific university
5. Click any application to see the full student profile
6. Click **Accept** or **Decline**, enter a reason, and confirm
7. The student's dashboard updates immediately

---

## Notes

- Each admin account is tied to exactly one university — they can only see their own university's applications
- Admin accounts cannot self-register — they are created by the seed only
- The university is determined by the account, not by a selection on login
- All 26 accounts use the same default password for demo convenience
