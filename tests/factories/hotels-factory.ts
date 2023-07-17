/* eslint-disable prettier/prettier */
import faker from '@faker-js/faker';
import { Hotel } from '@prisma/client';
import { prisma } from '@/config';

export async function createTicket() {
    return prisma.hotel.create({
        data: {
            name: faker.company.companyName(),
            image: faker.image.business()
        }
    });
}
