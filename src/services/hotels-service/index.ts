/* eslint-disable prettier/prettier */
import { notFoundError, paymentRequired } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.status !== 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw paymentRequired('You must pay the ticket to continue');
  }

  const hotel = await hotelsRepository.getHotels();

  if (!hotel) throw notFoundError();

  return hotel;
}

async function getHotelById(hotelId: number, userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.status !== 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw paymentRequired('You must pay the ticket to continue');
  }

  const rooms = await hotelsRepository.getHotelById(hotelId);
  if (!rooms) throw notFoundError();

  return rooms;
}

const hotelsService = { getHotels, getHotelById };

export default hotelsService;


