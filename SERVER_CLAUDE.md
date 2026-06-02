# Server Workspace Rules (kmaboe sandbox — 45.220.228.31)

> Place at ~/CLAUDE.md on the server. Claude Code reads it every session as HARD RULES.
> This is a SHARED server with a LIVE production service (GoTurbo) and is reachable
> from the internet (UFW is off). Breaking these rules can take down production or
> expose data. Non-negotiable.

---

## Working Directory
- Work ONLY inside `/home/kmaboe/` — never outside it
- This project: `/home/kmaboe/applyonce/`
- Never touch /home/<other users>, /var/www, /srv, /opt, or GoTurbo files

---

## TAKEN Ports — never bind to these
| Port | Owner |
|---|---|
| 22 | sshd |
| 53 | systemd-resolved DNS |
| 80 | nginx → GoTurbo frontend |
| 3000 | GoTurbo frontend (behind nginx) |
| 3200 | GoTurbo nginx |
| 6379 | GoTurbo Redis |
| 8090 | GoTurbo internal nginx |
| 32947 | systemd-resolved |

## My claimed range: 3600–3699
| Service | Port | Exposure |
|---|---|---|
| API | 3600 | public |
| Student portal | 3601 | public |
| University admin | 3602 | public |
| PostgreSQL | 3610 | 127.0.0.1 ONLY |
| Redis | 3611 | 127.0.0.1 ONLY |

Always `ss -tlnp` to confirm free before binding. Other free ports if needed: 4001, 8000, 8080, 9000.

---

## SECURITY — UFW is OFF
Every 0.0.0.0 port is internet-reachable.
- Postgres + Redis bind to 127.0.0.1 ONLY. Never 0.0.0.0.
- Never commit .env or secrets. Never log secrets.

---

## Docker
- GoTurbo owns all current containers (`goturbo-prod-*`) and network `go-turbo-deploy_internal`
- NEVER stop/restart/remove any container not prefixed `kmaboe-`
- NEVER attach to go-turbo-deploy_internal
- My containers prefixed `kmaboe-`, my network is `kmaboe-net`

---

## Already installed (do NOT reinstall)
Node v22.22.2, npm 10.9.7, Docker 29.1.3, Docker Compose 2.40.3, Git 2.43.0, Python 3.12.3, Claude Code.

---

## Permissions (kmaboe, uid 1007)
Passwordless sudo ONLY for: docker, docker compose, apt, apt-get, dpkg, systemctl, journalctl, service.
Cannot get root shell, read other users' files, or modify nginx. Do not attempt.

---

## Files
- Never rm -rf outside /home/kmaboe
- Never modify system files or nginx config
- Only Postgres + Redis in Docker; Node apps run on the host

---

## Git
- Pushes to TWO remotes (org + personal) via one push
- Never force-push; never commit .env, secrets, or uploads/
- Conventional commit messages

---

## Conduct
- When unsure if something is safe to touch — STOP and ask, never guess


### Allocated port block: 3600–3699 (org-designated — stay inside it)
This range is allocated to kmaboe on this server. Keep ALL ApplyOnce services inside 3600–3699. Always run `ss -tlnp` to confirm a specific port is free before binding (the allocation means it's ours, but verify nothing is already bound).
