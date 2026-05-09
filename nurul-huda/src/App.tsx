// src/App.tsx
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import EventCard from './components/EventCard';

const App = () => {
  const events = [
    {
      image: "https://via.placeholder.com/300x200",
      title: "Kuliah Maghrib Perdana",
      date: "15 Mei 2026",
      description: "Tafsir Al-Quran dan sesi soal jawab bersama Ustaz jemputan.",
      organizer: "Biro Dakwah"
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Program Gotong-Royong",
      date: "20 Mei 2026",
      description: "Membersihkan kawasan persekitaran masjid dan penyediaan jamuan.",
      organizer: "Jawatankuasa Kebersihan"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Banner />
      
      <main className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Aktiviti Terkini</h2>
        <div className="max-w-4xl mx-auto">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;