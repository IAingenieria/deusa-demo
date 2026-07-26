import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import {
  getClientes, estadoCuentaCliente, addAbono,
  totalVenta, totalAbonado, saldoPedido,
} from '../../services/dataService'
import Modal from '../../components/Modal'
import { money, fechaCorta } from '../../utils/format'

export default function AdminCuentas() {
  const { tick, notificar } = useApp()
  void tick
  const [abonoPara, setAbonoPara] = useState(null) // pedido
  const clientes = getClientes()

  const cuentas = clientes.map((c) => ({
    cliente: c,
    ...estadoCuentaCliente(c.id),
  }))

  const granTotal = cuentas.reduce((s, c) => s + c.total, 0)
  const granAbonado = cuentas.reduce((s, c) => s + c.abonado, 0)
  const granSaldo = granTotal - granAbonado

  return (
    <div className="px-4 py-3">
      <h1 className="mb-3 text-xl font-extrabold text-marino">Cuentas por cobrar</h1>

      <div className="grid grid-cols-3 gap-2">
        <Resumen label="Por cobrar" val={money(granTotal)} />
        <Resumen label="Cobrado" val={money(granAbonado)} accent="green" />
        <Resumen label="Saldo" val={money(granSaldo)} accent="red" />
      </div>

      <div className="mt-4 space-y-3">
        {cuentas.map(({ cliente, total, abonado, saldo, pedidos }) => (
          <div key={cliente.id} className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-marino">{cliente.nombre}</p>
                <p className="text-xs text-marino/50">{cliente.ciudad} · {cliente.telefono}</p>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-marino/50">Saldo</div>
                <div className={`text-lg font-extrabold ${saldo > 0 ? 'text-acento' : 'text-green-600'}`}>
                  {money(saldo)}
                </div>
              </div>
            </div>

            {/* Barra abonado / total */}
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-marino/10">
              <div
                className="h-full bg-green-500"
                style={{ width: `${total ? (abonado / total) * 100 : 0}%` }}
              />
            </div>
            <p className="mt-1 text-[11px] text-marino/50">
              Abonado {money(abonado)} de {money(total)}
            </p>

            {/* Pedidos del cliente con su saldo */}
            <div className="mt-3 space-y-1.5">
              {pedidos.map((p) => (
                <div key={p.id} className="flex items-center gap-2 rounded-lg bg-marino/5 px-2 py-1.5 text-xs">
                  <span className="font-semibold text-marino">{p.id}</span>
                  <span className="text-marino/50">{fechaCorta(p.fechaViaje)}</span>
                  <span className="ml-auto text-marino/60">
                    Saldo {money(saldoPedido(p))}
                  </span>
                  <button
                    onClick={() => setAbonoPara(p)}
                    className="rounded-md bg-marino px-2 py-1 text-[11px] font-semibold text-white"
                  >
                    + Abono
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AbonoModal
        pedido={abonoPara}
        onClose={() => setAbonoPara(null)}
        onSave={({ monto, fecha }) => {
          addAbono(abonoPara.id, { monto, fecha })
          notificar(`Abono de ${money(monto)} registrado en ${abonoPara.id}`, 'ok')
          setAbonoPara(null)
        }}
      />
    </div>
  )
}

function AbonoModal({ pedido, onClose, onSave }) {
  const hoy = new Date().toISOString().slice(0, 10)
  const [monto, setMonto] = useState('')
  const [fecha, setFecha] = useState(hoy)

  const [lastId, setLastId] = useState(pedido?.id)
  if (pedido && pedido.id !== lastId) {
    setLastId(pedido.id)
    setMonto('')
    setFecha(hoy)
  }

  if (!pedido) return null

  return (
    <Modal
      open={!!pedido}
      onClose={onClose}
      title={`Registrar abono · ${pedido.id}`}
      footer={
        <>
          <button onClick={onClose} className="btn-outline flex-1">Cancelar</button>
          <button
            onClick={() => monto && onSave({ monto: Number(monto), fecha })}
            className="btn-primary flex-1"
          >
            Guardar abono
          </button>
        </>
      }
    >
      <div className="space-y-3">
        <div className="rounded-lg bg-marino/5 p-3 text-sm">
          <div className="flex justify-between"><span className="text-marino/60">Total pedido</span><span className="font-bold text-marino">{money(totalVenta(pedido))}</span></div>
          <div className="flex justify-between"><span className="text-marino/60">Abonado</span><span className="font-bold text-green-600">{money(totalAbonado(pedido))}</span></div>
          <div className="flex justify-between"><span className="text-marino/60">Saldo</span><span className="font-bold text-acento">{money(saldoPedido(pedido))}</span></div>
        </div>
        <div>
          <label className="label">Monto del abono (MXN)</label>
          <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} className="input" placeholder="Ej: 500" autoFocus />
        </div>
        <div>
          <label className="label">Fecha</label>
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="input" />
        </div>
      </div>
    </Modal>
  )
}

function Resumen({ label, val, accent }) {
  const color = accent === 'green' ? 'text-green-600' : accent === 'red' ? 'text-acento' : 'text-marino'
  return (
    <div className="card p-3 text-center">
      <div className="text-[11px] uppercase tracking-wide text-marino/50">{label}</div>
      <div className={`text-sm font-extrabold ${color}`}>{val}</div>
    </div>
  )
}
