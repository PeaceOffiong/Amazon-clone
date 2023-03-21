import { ref } from "vue";

export const getCurrentlyLoggedInUser = () => {
    const user = ref("");

    function currentuser() {
        const currentUser = localStorage
            .getItem("username")
            .split(" ")
            .slice(0, 1);
        user.value = currentUser;
    }
    return {user, currentuser};
}