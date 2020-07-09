import { Data } from '@angular/router';

export class campgroundModel {
    campgrounds: {
        _id: string;
        title: string;
        price: string;
        description: string;
        imageId: string;
        imageURL: string;
        author: {
            username: string;
            firstname: string;
            lastname: string;
            email: string;
            avatarId: string;
            avatarURL: string;
            bio: string
        };
        reviews: {
            rating: Number;
            text: string;
            author: string;
            campground: string;
            createdAt: Date;
        }
        createdAt: Date;
        rating: Number;
        slug: string;
    };
}