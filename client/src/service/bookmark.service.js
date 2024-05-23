import axiosInstance from "../utils/axiosInstance";

export const addToBookMark = async (mediaType, id) => {
    try {
        let response;
        if (mediaType === 'movie') {
            response = await axiosInstance.post('/bookmark/add', { movieId: id }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: document.cookie,
                }
            });
            return response.data;

        } else {
            response = await axiosInstance.post('/bookmark/add', { tvseriesId: id }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: document.cookie,
                }
            });
            return response.data;

        }
    } catch (error) {
        console.log("Error while bookmarking", error);
    }
};

export const removeBookMark = async (id) => {
    let response;
    try {
        response = await axiosInstance.delete(`/bookmark/remove/${id}`, {
            headers: {
                Authorization: document.cookie,
            }
        });

        return response.data;

    } catch (error) {
        // Handle error
        console.error("Error while removing bookmark:", error);
    }
};