export const places = [
    {
        name: 'Prudential Center',
        image:
            'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=80',
        lat: 40.7336,
        lng: -74.171,
    },
    {
        name: 'Branch Brook Park',
        image:
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
        lat: 40.7806,
        lng: -74.1729,
    },
    {
        name: 'Newark Museum of Art',
        image:
            'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1400&q=80',
        lat: 40.7409,
        lng: -74.1747,
    },
    {
        name: 'Newark Liberty Airport',
        image:
            'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=80',
        lat: 40.6895,
        lng: -74.1745,
    },
];

export const mapUrl = (lat, lng) => `https://www.google.com/maps?q=${lat},${lng}`;
export const earthUrl = (lat, lng) =>
    `https://earth.google.com/web/@${lat},${lng},1200a,35y,0h,0t,0r`;
