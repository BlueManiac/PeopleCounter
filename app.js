export default {
    data() {
        return {
            genders: [{
                type: "Men",
                count: 0
            }, {
                type: "Women",
                count: 0
            }, {
                type: "Other",
                count: 0
            }],
            history: []
        }
    },
    created() {
        for (let gender of this.genders) {
            gender.count = parseInt(localStorage.getItem(gender.type) || 0);
        }
    },
    mounted() {
    },
    methods: {
        increase(gender, count) {
            let change = Math.max(-gender.count, count);

            if (!change)
                return;

            gender.count += change;

            this.save(gender, change);
        },
        reset() {
            for (let gender of this.genders) {
                gender.count = 0;

                this.save(gender, "Reset");
            }
        },
        save(gender, change) {
            this.history.unshift({
                time: new Date(),
                gender: gender.type,
                change: change
            });
            localStorage.setItem(gender.type, gender.count);
        }
    },
    computed: {
        total() {
            return this.genders.reduce((sum, y) => sum + y.count, 0);
        }
    },
    watch: {
    }
};