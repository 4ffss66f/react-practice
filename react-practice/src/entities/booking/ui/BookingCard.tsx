import type { IService } from '../model'

interface BookingCardProps {
  service: IService
}

export function BookingCard({ service }: BookingCardProps) {
  return (
    <article className="booking-card">
      <div className="booking-card__head">
        <h3>{service.name}</h3>
        <span>{service.price !== undefined ? `${service.price} ₽` : 'Цена по запросу'}</span>
      </div>
      <p className="booking-card__date">{service.DateOfBooking.toLocaleDateString('ru-RU')}</p>
      <div className="booking-card__tags">
        {service.tags.map((tag) => (
          <span key={tag} className="booking-card__tag">
            {tag}.
          </span>
        ))}
      </div>
    </article>
  )
}
