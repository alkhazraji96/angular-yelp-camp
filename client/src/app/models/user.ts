export class UserModel {
    user: {
        username: string;
        firstname: string;
        lastname: string;
        email: string;
        avatarId: string;
        avatarURL: string;
        bio: string
    };
    id_token: string
    public constructor(user = {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        avatarId: '',
        avatarURL: '',
        bio: ''
      },
      id_token = '') {
        this.user = user
        this.id_token = id_token
    }
}
