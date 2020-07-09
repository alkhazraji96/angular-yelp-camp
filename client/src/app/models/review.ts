export class campgroundModel {
    review: {
        rating: Number;
        text: string;
        author: string;
        campground: {
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
        createdAt: Date;
        slug: string;
        }
        createdAt: Date;
    };
}