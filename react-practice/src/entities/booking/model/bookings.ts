import type { IService } from './IService'

export const initialBookings: IService[] = [
  {
    id: 1,
    name: 'Cleaning service',
    price: 80,
    DateOfBooking: new Date('2026-07-05'),
    tags: ['cleaning', 'home'],
  },
  {
    id: 2,
    name: 'Consultation',
    price: 120,
    DateOfBooking: new Date('2026-07-12'),
    tags: ['advice', 'online'],
  },
  {
    id: 3,
    name: 'Installation',
    price: 220,
    DateOfBooking: new Date('2026-08-02'),
    tags: ['installation', 'service'],
  },
]

export const getUniqueBookingTags = (services: IService[]) =>
  Array.from(new Set(services.flatMap((service) => service.tags))).sort()

export const formatBookingDate = (date: Date) =>
  date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
