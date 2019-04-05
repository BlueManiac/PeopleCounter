import { jsonParseDate } from "./json-helpers.js";
import cloneDeep from 'https://cdn.jsdelivr.net/npm/lodash-es/cloneDeep.js';

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
            history: [],
            sessions: [],
            activeTab: "sessions"
        }
    },
    created() {
        for (let gender of this.genders) {
            gender.count = parseInt(localStorage.getItem(gender.type) || 0);
        }
        this.sessions = JSON.parse(localStorage.getItem('sessions') || "[]", jsonParseDate);
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
        },
        commit() {
            this.sessions.unshift({
                date: new Date(),
                genders: cloneDeep(this.genders),
                total: this.total
            })

            localStorage.setItem('sessions', JSON.stringify(this.sessions));
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