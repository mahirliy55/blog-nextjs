import * as types from '../types'

const initialState = {
  blogs: [],
  blog: {},
  loading: [],
  error: null,
  deleted: false,
}

export const blogReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
        loading: false,
        error: null,
      }

    case types.GET_BLOG:
      return {
        ...state,
        blog: action.payload,
        loading: false,
        error: null,
      }
    case types.ADD_BLOG:
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
        loading: false,
        error: null,
      }
    case types.EDIT_BLOG:
      return {
        ...state,
        blog: action.payload,
        loading: false,
        error: null,
      }

    case types.DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog.id !== action.payload),
        blog: {},
        loading: false,
        error: null,
        deleted: true,
      }

    case types.ADD_COMMENT:
      return {
        ...state,
        blog: { ...state.blog, comments: [action.payload] },
        loading: false,
        error: null,
        deleted: false,
      }

    default:
      return state
  }
}
