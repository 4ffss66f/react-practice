import { useMemo, useState } from 'react'
import { BookingCard } from './BookingCard'
import { formatBookingDate, getUniqueBookingTags, initialBookings, type IService } from '../model'
import './BookingList.css'

export function BookingList() {
  const [services, setServices] = useState<IService[]>(initialBookings)
  const [filterTag, setFilterTag] = useState('Все')
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [price, setPrice] = useState('')
  const [tags, setTags] = useState('')

  const visibleTags = useMemo(() => ['Все', ...getUniqueBookingTags(services)], [services])

  const filteredServices = useMemo(
    () =>
      filterTag === 'Все'
        ? services
        : services.filter((service) => service.tags.includes(filterTag)),
    [filterTag, services],
  )

  const nextId = useMemo(
    () => Math.max(...services.map((service) => service.id), 0) + 1,
    [services],
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name.trim() || !date) {
      return
    }

    const newService: IService = {
      id: nextId,
      name: name.trim(),
      price: price.trim() ? Number(price) : undefined,
      DateOfBooking: new Date(date),
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    setServices((current) => [newService, ...current])
    setName('')
    setDate('')
    setPrice('')
    setTags('')
    setFilterTag('Все')
  }

  return (
    <section className="booking-section">
      <div className="booking-header">
        <div>
          <p className="booking-eyebrow">Сервис бронирований</p>
          <h1>Управление услугами</h1>
          <p className="booking-description">
            Добавляйте новые услуги, фильтруйте по тегам и просматривайте дату бронирования.
          </p>
        </div>
        <div className="booking-filter">
          <label htmlFor="booking-filter">Фильтр по тегу</label>
          <select
            id="booking-filter"
            value={filterTag}
            onChange={(event) => setFilterTag(event.target.value)}
          >
            {visibleTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="booking-form__column">
          <label htmlFor="service-name">Название услуги</label>
          <input
            id="service-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Например, Консультация"
          />
        </div>
        <div className="booking-form__column">
          <label htmlFor="service-date">Дата бронирования</label>
          <input
            id="service-date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div className="booking-form__column">
          <label htmlFor="service-price">Цена (₽)</label>
          <input
            id="service-price"
            type="number"
            min="0"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="По желанию"
          />
        </div>
        <div className="booking-form__column">
          <label htmlFor="service-tags">Теги</label>
          <input
            id="service-tags"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="Через запятую: cleaning, home"
          />
        </div>
        <button type="submit" className="booking-form__submit">
          Добавить услугу
        </button>
      </form>

      <div className="booking-list">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <BookingCard key={service.id} service={service} />
          ))
        ) : (
          <div className="booking-empty">
            Услуги не найдены. Попробуйте другой тег или добавьте новую услугу.
          </div>
        )}
      </div>

      <footer className="booking-summary">
        Всего услуг: {services.length}. Последняя запись:{' '}
        {formatBookingDate(services[0].DateOfBooking)}
      </footer>
    </section>
  )
}
