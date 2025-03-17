import profileStore from "@/store/profileStore";
import categoryMap from "@/types/map/categoryMap";

import axiosInstance from "../../middleware/api";

export interface FetchMyPageMeetingsParams {
  type: string; // '나의 번개' | '내가 만든 번개'
  category?: string; // '술' | '카페' | '보드 게임' | '맛집'
  size?: number;
  page?: number;
}

export interface FetchParams {
  category?: string;
  type?: string;
  page?: number;
  size?: number;
}

export const fetchProfile = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/my-page/user");
    profileStore.getState().setInitialProfile(response.data);
    return response.data;
  } catch (error) {
    console.error("프로필 정보를 불러오는데 실패했습니다.: ", error);
  }
};

export const updateProfile = async (
  data: { nickname?: string; description?: string },
  imageFile?: File | null,
) => {
  try {
    const formData = new FormData();
    if (data.nickname) formData.append("nickname", data.nickname);
    if (data.description) formData.append("description", data.description);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    const response = await axiosInstance.post(
      "/api/v1/my-page/user",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    const profileResponse = await axiosInstance.get("/api/v1/my-page/user");
    profileStore.getState().setInitialProfile(profileResponse.data);
    return response.data;
  } catch (error) {
    console.error("프로필 정보 수정에 실패했습니다.: ", error);
  }
};

export const fetchMyPageMeetings = async ({
  type,
  category,
  size = 10,
  page = 1,
}: FetchMyPageMeetingsParams) => {
  try {
    const params: Record<string, string | number> = {
      page,
      size,
    };

    if (category) {
      params.category = categoryMap[category] || "ALCOHOL";
    }

    const basePath = "/api/v1/my-page/lightenings";
    let endPoint;

    if (type === "나의 번개") {
      endPoint = `${basePath}/joined`;
    } else if (type === "내가 만든 번개") {
      endPoint = `${basePath}/created`;
    } else {
      endPoint = `${basePath}/joined`;
    }

    const response = await axiosInstance.get(endPoint, { params });
    return response.data;
  } catch (error) {
    console.error("내가 만든 번개 목록을 불러오는데 실패했습니다.: ", error);
  }
};

export const fetchMyPageReviews = async (
  { category, type, page = 1, size = 10 }: FetchParams & { size?: number } = {
    page: 1,
  },
) => {
  try {
    const apiParams: Record<string, string | number> = {
      page,
      size,
    };

    if (category) {
      const mappedCategory = categoryMap[category] || "ALCOHOL";
      apiParams.category = mappedCategory;
    }

    const response = await axiosInstance.get(
      "/api/v1/my-page/reviews/created",
      {
        params: apiParams,
      },
    );
    return response.data;
  } catch (error) {
    console.error("내가 작성한 리뷰를 불러오는데 실패하였습니다.: ", error);
  }
};
