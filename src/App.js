import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const mockAnalyticsData = {
  overview: {
    totalDownloads: 45678,
    monthlyGrowth: 12.5,
    avgRating: 4.7,
    subscribers: 8923,
    engagement: 85.2,
    revenue: 2450.75,
  },
  platforms: [
    { name: 'Spotify', listeners: 18500, growth: 15, revenue: 890.25 },
    { name: 'Apple Podcasts', listeners: 12300, growth: 8, revenue: 675.50 },
    { name: 'YouTube', listeners: 8900, growth: 22, revenue: 445.75 },
    { name: 'Google Podcasts', listeners: 4200, growth: 5, revenue: 235.50 },
  ],
  demographics: [
    { age: '25-34', percentage: 35, listeners: 15987 },
    { age: '35-44', percentage: 28, listeners: 12790 },
    { age: '18-24', percentage: 20, listeners: 9136 },
    { age: '45-54', percentage: 17, listeners: 7765 },
  ],
  episodes: [
    {
      id: 'ep_047',
      title: 'The Future of AI in Content Creation',
      publishDate: '2024-08-01',
      downloads: 5430,
      avgRating: 4.8,
      completionRate: 82,
      revenue: 245.75,
    },
    {
      id: 'ep_046',
      title: 'Building Better User Experiences',
      publishDate: '2024-07-25',
      downloads: 4890,
      avgRating: 4.6,
      completionRate: 78,
      revenue: 198.50,
    },
  ],
};

const DailyDoseManagementSystem = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [error, setError] = useState(null);

  const fetchAnalytics = () => {
    try {
      return mockAnalyticsData;
    } catch (err) {
      setError('Failed to load analytics data');
      return null;
    }
  };

  const analyticsData = fetchAnalytics();

  const renderAnalytics = () => (
    <div className="space-y-6 p-4">
      {error && (
        <div
          className="bg-red-100 p-4 rounded text-red-700"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-800">Analytics Dashboard</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-sm font-medium text-gray-600">Total Downloads</h4>
          <p className="text-2xl font-bold text-blue-600" aria-label="Total Downloads">
            {analyticsData.overview.totalDownloads.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-sm font-medium text-gray-600">Subscribers</h4>
          <p className="text-2xl font-bold text-green-600" aria-label="Subscribers">
            {analyticsData.overview.subscribers.toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-sm font-medium text-gray-600">Revenue</h4>
          <p className="text-2xl font-bold text-purple-600" aria-label="Revenue">
            ${analyticsData.overview.revenue.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-lg font-semibold mb-4">Platform Performance</h4>
        <div style={{ height: '300px' }}>
          <Bar
            data={{
              labels: analyticsData.platforms.map((p) => p.name),
              datasets: [
                {
                  label: 'Listeners',
                  data: analyticsData.platforms.map((p) => p.listeners),
                  backgroundColor: 'rgba(75, 192, 192, 0.4)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                },
                {
                  label: 'Revenue ($)',
                  data: analyticsData.platforms.map((p) => p.revenue),
                  backgroundColor: 'rgba(255, 99, 132, 0.4)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Value' } },
                x: { title: { display: true, text: 'Platform' } },
              },
              plugins: {
                title: { display: true, text: 'Listeners and Revenue by Platform' },
                legend: { position: 'top' },
              },
            }}
            aria-label="Platform Performance Chart"
          />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-lg font-semibold mb-4">Audience Demographics</h4>
        <div style={{ height: '300px' }}>
          <Pie
            data={{
              labels: analyticsData.demographics.map((d) => d.age),
              datasets: [
                {
                  data: analyticsData.demographics.map((d) => d.percentage),
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                  borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: { display: true, text: 'Audience Age Distribution' },
                legend: { position: 'right' },
              },
            }}
            aria-label="Audience Demographics Chart"
          />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-lg font-semibold mb-4">Top Episodes</h4>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Episode</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Downloads</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {analyticsData.episodes.map((episode) => (
              <tr key={episode.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{episode.title}</td>
                <td className="px-4 py-2 text-sm">{episode.downloads.toLocaleString()}</td>
                <td className="px-4 py-2 text-sm text-green-600">${episode.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const tabs = [{ id: 'analytics', label: 'Analytics' }];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Daily Dose Management System</h1>
          <nav>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                tabIndex={0}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActiveTab(tab.id);
                }}
                className={`px-4 py-2 rounded-md ${
                  activeTab === tab.id ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="p-4">{activeTab === 'analytics' && renderAnalytics()}</main>
    </div>
  );
};

export default DailyDoseManagementSystem;
