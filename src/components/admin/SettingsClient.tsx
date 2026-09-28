"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Settings, TeamMember } from "@/lib/types";
import { initials } from "@/lib/utils";

export function SettingsClient({ settings: initial }: { settings: Settings }) {
  const router = useRouter();
  const [s, setS] = useState(initial);
  const [msg, setMsg] = useState("");
  const [member, setMember] = useState({ name: "", phone: "", role: "tech" });

  async function save() {
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(s),
    });
    setMsg("Réglages enregistrés");
    router.refresh();
  }

  async function addMember() {
    if (!member.name.trim()) return;
    const m: TeamMember = {
      id: "t" + Date.now(),
      name: member.name.trim(),
      phone: member.phone,
      role: member.role as TeamMember["role"],
      active: true,
    };
    const next = { ...s, team: [...s.team, m] };
    setS(next);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    setMember({ name: "", phone: "", role: "tech" });
    router.refresh();
  }

  return (
    <div className="panes" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))" }}>
      <section className="pane">
        <header>
          <h3>Identité de l&apos;entreprise</h3>
        </header>
        <div className="bd" style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          <div className="field">
            <label>Nom de l&apos;entreprise</label>
            <input
              className="input"
              value={s.company}
              onChange={(e) => setS({ ...s, company: e.target.value })}
            />
            <span className="hint">Ce champ remplace le nom partout sur le site.</span>
          </div>
          <div className="field">
            <label>Accroche</label>
            <input
              className="input"
              value={s.tagline.fr}
              onChange={(e) => setS({ ...s, tagline: { ...s.tagline, fr: e.target.value } })}
            />
          </div>
          <div className="grid2">
            <div className="field">
              <label>Téléphone</label>
              <input className="input" value={s.phone} onChange={(e) => setS({ ...s, phone: e.target.value })} />
            </div>
            <div className="field">
              <label>WhatsApp</label>
              <input className="input" value={s.whatsapp} onChange={(e) => setS({ ...s, whatsapp: e.target.value })} />
            </div>
          </div>
          <div className="field">
            <label>E-mail</label>
            <input className="input" value={s.email} onChange={(e) => setS({ ...s, email: e.target.value })} />
          </div>
          <div className="field">
            <label>Adresse</label>
            <input
              className="input"
              value={s.address.fr}
              onChange={(e) => setS({ ...s, address: { ...s.address, fr: e.target.value } })}
            />
          </div>
          <div className="field">
            <label>Horaires</label>
            <input
              className="input"
              value={s.hours.fr}
              onChange={(e) => setS({ ...s, hours: { ...s.hours, fr: e.target.value } })}
            />
          </div>
          <button type="button" className="btn btn-pri" style={{ alignSelf: "flex-start" }} onClick={save}>
            Enregistrer
          </button>
          {msg ? <p className="sm" style={{ color: "var(--ok)" }}>{msg}</p> : null}
        </div>
      </section>

      <section className="pane">
        <header>
          <h3>Frais de déplacement</h3>
        </header>
        <div className="bd" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p className="hint">Montant affiché au client avant l&apos;envoi de sa demande.</p>
          <div className="tw">
            <table>
              <thead>
                <tr>
                  <th>Ville</th>
                  <th>Prix</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {s.fees.map(([city, fee], i) => (
                  <tr key={city + i}>
                    <td>{city}</td>
                    <td>
                      <input
                        className="input num"
                        style={{ width: 100, padding: "5px 8px" }}
                        type="number"
                        value={fee}
                        onChange={(e) => {
                          const fees = s.fees.slice() as [string, number][];
                          fees[i] = [city, Number(e.target.value) || 0];
                          setS({ ...s, fees });
                        }}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-dan"
                        onClick={() => setS({ ...s, fees: s.fees.filter((_, j) => j !== i) })}
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="field">
            <label>Délai de réponse annoncé (heures)</label>
            <input
              className="input num"
              style={{ width: 110 }}
              type="number"
              value={s.sla}
              onChange={(e) => setS({ ...s, sla: Number(e.target.value) || 24 })}
            />
          </div>
          <div className="field">
            <span className="lab">Canaux de contact</span>
            <div className="grid3">
              {(["phone", "wa", "mail"] as const).map((c) => (
                <label key={c} className="opt" data-on={s.channels[c] ? 1 : 0}>
                  <input
                    type="checkbox"
                    checked={s.channels[c]}
                    onChange={(e) =>
                      setS({ ...s, channels: { ...s.channels, [c]: e.target.checked } })
                    }
                  />
                  <span className="t" style={{ fontWeight: 500, fontSize: 13.5 }}>
                    {c === "phone" ? "Téléphone" : c === "wa" ? "WhatsApp" : "E-mail"}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <button type="button" className="btn btn-pri" style={{ alignSelf: "flex-start" }} onClick={save}>
            Enregistrer
          </button>
        </div>
      </section>

      <section className="pane" style={{ gridColumn: "1 / -1" }}>
        <header>
          <h3>Équipe</h3>
        </header>
        <div className="bd" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p className="hint">Le responsable et les personnes envoyées sur le terrain.</p>
          <div className="tw">
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Rôle</th>
                  <th>Téléphone</th>
                  <th>Actif</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {s.team.map((m, i) => (
                  <tr key={m.id}>
                    <td>
                      <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
                        <span className="avm">{initials(m.name)}</span>
                        <b>{m.name}</b>
                      </div>
                    </td>
                    <td>
                      <select
                        className="select"
                        style={{ padding: "5px 8px", width: "auto" }}
                        value={m.role}
                        onChange={(e) => {
                          const team = s.team.slice();
                          team[i] = { ...m, role: e.target.value as TeamMember["role"] };
                          setS({ ...s, team });
                        }}
                      >
                        <option value="manager">Responsable</option>
                        <option value="tech">Technicien</option>
                        <option value="sales">Commercial</option>
                      </select>
                    </td>
                    <td className="mono sm">{m.phone || "—"}</td>
                    <td>
                      <label className="sm" style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                        <input
                          type="checkbox"
                          checked={m.active}
                          onChange={(e) => {
                            const team = s.team.slice();
                            team[i] = { ...m, active: e.target.checked };
                            setS({ ...s, team });
                          }}
                        />
                        {m.active ? "Oui" : "Non"}
                      </label>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-dan"
                        onClick={() => {
                          if (m.role === "manager" && s.team.filter((x) => x.role === "manager").length < 2) {
                            alert("Gardez au moins un responsable.");
                            return;
                          }
                          setS({ ...s, team: s.team.filter((x) => x.id !== m.id) });
                        }}
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="toolbar">
            <input
              className="input"
              placeholder="Nom"
              style={{ flex: "1 1 140px" }}
              value={member.name}
              onChange={(e) => setMember({ ...member, name: e.target.value })}
            />
            <input
              className="input"
              placeholder="06 00 00 00 00"
              style={{ flex: "0 1 150px" }}
              value={member.phone}
              onChange={(e) => setMember({ ...member, phone: e.target.value })}
            />
            <select
              className="select"
              style={{ width: "auto" }}
              value={member.role}
              onChange={(e) => setMember({ ...member, role: e.target.value })}
            >
              <option value="tech">Technicien</option>
              <option value="sales">Commercial</option>
              <option value="manager">Responsable</option>
            </select>
            <button type="button" className="btn btn-out" onClick={addMember}>
              Ajouter au staff
            </button>
            <button type="button" className="btn btn-pri" onClick={save}>
              Enregistrer l&apos;équipe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
