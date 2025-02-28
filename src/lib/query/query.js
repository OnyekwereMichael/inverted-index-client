import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { QUERY_KEYS } from "../enum";
export const CreateUserAccount = () => {
    return useMutation({
        mutationFn: async ({ email, fullname, password }) => {
            try {
                const res = await fetch('http://localhost:5000/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, fullname, password })
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error);
                if (data.error) throw new Error(data.error);
                console.log(data);
                toast.success('Account created successfully!');
                return data;
            } catch (error) {
                console.error(error);
                toast.error(error.message || 'Failed to create user');
            }
        }
    });
};


export const SignInAccount = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async ({ email, password }) => {
            try {
                const res = await fetch('http://localhost:5000/api/auth/signin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error);
                console.log(data);
                toast.success('Logged in successfully!');
                navigate('/');
                return data;
            }catch (error) {
                console.error(error);
                toast.error(error.message || 'Failed to create user');
            }
        }
    })
}

export const useLogout = () => {
    return useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/api/auth/logout', {
                    method: 'POST',
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error);
                console.log(data);
                toast.success('Logged out successfully!');
                return data;
            } catch (error) {
                console.error(error);
                toast.error(error.message || 'Failed to create user');
            }
        }
    })
}

export const GetAuthUser = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/api/auth/me');
                const data = await res.json();
                if (data.error) return null;
                if (!res.ok) throw new Error(data.error);
                console.log(data);
                if (data?._id) connectUser(data._id);
                return data;
            }catch (error) {
                console.error(error);
                toast.error(error.message || 'Failed to create user');
            }
        },

        retry: false,

    })
}


export const GetAllRides = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RIDES], 
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/ride`);
                const data = await res.json();
                // if (data.error) return null;
                if (!res.ok) throw new Error(data.error || "Failed to fetch rides");
               console.log(data);
                return data;
            }catch (error) {
                console.error(error);
                toast.error(error.message || 'Failed to fetch rides');
            }
        },
        retry: false,
    });
};

export const useSearchRides = (query) => {
    return useQuery({
        queryKey: [QUERY_KEYS.SEARCH_RIDES, query],
        queryFn: async () => {
            if (!query || query.trim() === "") return [];  // Prevent empty queries
            
            try {
                const res = await fetch(`http://localhost:5000/api/ride/search?query=${query}`);
                const data = await res.json();
                
                if (!res.ok) throw new Error(data.message || "Failed to fetch posts"); // Use message, not error
                
                console.log(data);
                return data;
            } catch (error) {
                console.error(error);
                toast.error(error.message || 'Failed to fetch posts');
                return []; 
            }
        },
        enabled: !!query && query.trim() !== "", // Prevents requests when query is empty
        retry: false,
    });
};


export const useDeleteRide = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (rid) => {
            try {
                const res = await fetch(`http://localhost:5000/api/ride/delete/${rid}`, {
                    method: 'DELETE',
                });
                const data = await res.json();
                if (data.error) return null;
                if (!res.ok) throw new Error(data.error);
                console.log(data);
                return data;
            } catch (error) {
                console.error(error);
                toast.error(error.message || 'Failed to delete rides');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RIDES] });
            toast.success('Rides deleted successfully!');
        },
    });
};

export const useCreateRide = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ name, year, type, price, image}) => {
            try {
                const res = await fetch('http://localhost:5000/api/ride/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, type, price, image, year}),
                });
                const data = await res.json();
                if (data.error) return null;
                if (!res.ok) throw new Error(data.error);
                console.log("pOST DATA  ", data);
                return data;
            }catch (error) {
                console.error(error);
                toast.error(error.message || 'Failed to create rides');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RIDES] });
            toast.success('Collection created successfully!');
        },
    });
}

export const useEditRide = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({rid,  name, year, type, price, image}) => {
            try {
                if (!name && !year && !image && !type && !price) {
                    throw new Error("At least one field is required to update your post.");
                }

                const res = await fetch(`http://localhost:5000/api/ride/update/${rid}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, year, type, price, image}),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || "Failed to update post");
                }
                return await res.json();
            } catch (error) {
                console.error(error);
                toast.error(error.message || 'Failed to update rides');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] });
            toast.success('Post Updated Successfully');
        },
    });
};

export const useGetRideById = (id) => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RIDES, id],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/ride/${id}`);
                if (!res.ok) throw new Error("Failed to fetch ride");
                const data = await res.json();
                return data;
            } catch (error) {
                console.error(error);
                toast.error(error.message || 'Failed to fetch ride');
                throw error;
            }
        },
        enabled: !!id, // Prevent running query if id is undefined
        retry: false,
    });
};