/* eslint-disable prettier/prettier */
import { Ticket } from '@prisma/client';
import { notFoundError, paymentRequired, unauthorizedError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.status !== 'PAID' || !ticket.TicketType.isRemote || !ticket.TicketType.isRemote) {
    throw paymentRequired('You must pay the ticket to continue');
  }

  const hotel = await hotelsRepository.getHotels();

  if (!hotel) throw notFoundError();

  return hotel;
}

const hotelsService = { getHotels };

export default hotelsService;
