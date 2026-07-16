'use client';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Senin', nilai: 85 },
  { name: 'Selasa', nilai: 88 },
  { name: 'Rabu', nilai: 92 },
  { name: 'Kamis', nilai: 86 },
  { name: 'Jumat', nilai: 95 },
];

export default function ProgressChart() {
  return (
    <div className="w-full h-[350px] bg-card p-6 rounded-2xl border-2 border-border shadow-sm font-sans">
      <h3 className="text-xl font-heading font-bold text-foreground mb-6">Grafik Perkembangan Nilai Mingguan</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorNilai" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0D9488" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#0D9488" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#5EEAD4" opacity={0.3} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#134E4A', fontWeight: 600 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#134E4A', fontWeight: 600 }} />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: '2px solid #5EEAD4', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            itemStyle={{ color: '#0D9488', fontWeight: 'bold' }}
          />
          <Area type="monotone" dataKey="nilai" stroke="#0D9488" strokeWidth={4} fillOpacity={1} fill="url(#colorNilai)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
