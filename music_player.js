class MusicPlayer {
    constructor(music_list) {
        this.music_list = music_list;
        this.index = 0;
    }

    get_music() {
        return this.music_list[this.index];
    }

    next() {
        if (this.index + 1 < this.music_list.length) {
            this.index ++;
        }
        else {
            this.index = 0;
        }
    }

    prev() {
        if (this.index !=0) {
            this.index --;
        }
        else {
            this.index = this.music_list.length -1;
        }
    }
}




