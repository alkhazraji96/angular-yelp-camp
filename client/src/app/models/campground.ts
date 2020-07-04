export class campgroundModel {
    campgrounds: {
        _id: string;
        title: string;
        price: string;
        description: string;
        imageId: string;
        createdAt: Date;
    };
    public constructor(camp = {
        _id: '',
        title: '',
        price: '',
        description: '',
        imageId: '',
        createdAt: new Date
      }) {
        this.campgrounds = camp
    }
}