class Music {
    constructor(title,singer,image,file) {
        this.title = title;
        this.singer = singer;
        this.image = image;
        this.file = file;
    }

    get_name() {
        return this.singer + " - " + this.title;
    }
}

const music_list = [
    new Music("Animals","Maroon 5","animals.png","animals.mp3"),
    new Music("Another One Bites The Dust","Queen","another_one_bites_the_dust.png","another_one_bites_the_dust.mp3"),
    new Music("Brooklyn Baby","Lana Del Rey","brooklyn_baby.png","brooklyn_baby.mp3"),
    new Music("Cigaratte Smoker Fiona","Arctic Monkeys","cigarette_smoker_fiona.png","cigarette_smoker_fiona.mp3"),
    new Music("Good 4 U","Olivia Rodrigo","good_4_u.png","good_4_u.mp3"),
    new Music("I Wanna Be Your Girlfriend","Girl In Red","i_wanna_be_your_girlfriend.png","i_wanna_be_your_girlfriend.mp3"),
    new Music("Time Is Running Out","Muse","time_is_running_out.png","time_is_running_out.mp3"),
]