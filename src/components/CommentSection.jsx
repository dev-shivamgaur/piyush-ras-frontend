import React, { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { addComment, addReplyComment, getAllComments, getReplyComments } from "../services/comment.service";
import { createNewAccessToken } from "../services/user.service";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { socket } from "../../socket";
import { CgProfile } from "react-icons/cg";
import { Time } from "./timeConverter";
import { AiFillLike } from "react-icons/ai";
import { fetchCommentReactionStatus, fetchReplyCommentsReactionStatus, toggleCommentReaction } from "../services/reaction.service";

const CommentSection = ({ poetryId }) => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const authData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(true);
  const [totalCommentCount, setTotalComment] = useState("");
  const [reactionMap, setReactionMap] = useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ ADD COMMENT
  const onSubmit = async (data) => {
    if (!data.commentContent?.trim()) return;

    let res = await addComment(poetryId, null, data.commentContent);

    if (res.message === "Unauthorized") {
      const res2 = await createNewAccessToken();

      if (res2.message === "Session expired, please login!") {
        sessionStorage.setItem(
          "prottectedRouteUrl",
          location.pathname + location.search
        );
        navigate("/login");
        return;
      }

      if (res2.message === "Access Token is created SuccessFully") {
        res = await addComment(poetryId, null, data.commentContent);
      }
    }

    reset();
  };

  // ✅ FETCH COMMENTS
  useEffect(() => {
    setLoading(true);
    const fetchAllComment = async () => {
      let res = await getAllComments(poetryId, 20, 1);
      setTotalComment(res?.data?.totalComment)
      setComments(res?.data?.result?.docs || []);
      setLoading(false);
    };
    fetchAllComment();
  }, [poetryId]);

  // ✅ RECURSIVE FUNCTION (FIXED)
  const addReplyRecursive = (comments, commentId, replyData) => {
    if (!Array.isArray(comments)) return [];

    return comments.map((c) => {
      // duplicate check
      const alreadyExists = (c.replies || []).some(
        (r) => r._id === replyData._id
      );

      if (c._id === commentId && !alreadyExists) {
        return {
          ...c,
          replies: [
            ...(c.replies || []),
            {
              _id: replyData._id,
              content: replyData.content,
              owner: {
                avatar: replyData?.owner?.avatar || "",
                fullName: replyData?.owner?.fullName,
              },
              createdAt: replyData.createdAt,
              replyCount: replyData.replyCount,
              replies: [],
            },
          ],
        };
      }

      if (c.replies && c.replies.length > 0) {
        return {
          ...c,
          replies: addReplyRecursive(c.replies, commentId, replyData),
        };
      }

      return c;
    });
  };

  // ✅ ADD REPLY API
  const addReply = async (commentId, replyText) => {
    if (!replyText.trim()) return;

    let res = await addReplyComment(poetryId, commentId, replyText);

    if (res.message === "Unauthorized") {
      const res2 = await createNewAccessToken();

      if (res2.message === "Session expired, please login!") {
        sessionStorage.setItem(
          "prottectedRouteUrl",
          location.pathname + location.search
        );
        navigate("/login");
        return;
      }

      if (res2.message === "Access Token is created SuccessFully") {
        await addReplyComment(poetryId, commentId, replyText);
      }
    }
  };

  // ✅ SOCKET (REALTIME FIXED)
  useEffect(() => {
    socket.emit("join-poetry", poetryId);

    socket.on("newComment", (data) => {
      if (data?.parentComment === null) {
        setComments((prev) => [data, ...prev]);
        return;
      }

      setComments((prev) =>
        addReplyRecursive(prev, data.parentComment, data)
      );
    });

    return () => {
      socket.off("newComment");
    };
  }, [poetryId]);

  useEffect(() => {
    if (authData) {
      const fetchCommentsRec = async () => {
        let res = await fetchCommentReactionStatus(poetryId);

        if (res.message === "Unauthorized") {
          const res2 = await createNewAccessToken();
    
          if (res2.message === "Session expired, please login!") {
            sessionStorage.setItem(
              "prottectedRouteUrl",
              location.pathname + location.search
            );
            navigate("/login");
            return;
          }
    
          if (res2.message === "Access Token is created SuccessFully") {
            res = await fetchCommentReactionStatus(poetryId);
          }
        }
  
        const map = {};
  
        res?.data?.forEach((item) => {
          map[item._id] = item.userReaction; // key = commentId
        });
  
        setReactionMap(map);
      };
  
      fetchCommentsRec();
    }
  }, [poetryId, authData]);

  const handleCheckAuthStatus = () => {
    if (!authData) navigate("/login");

  };

  const handleLike = async(commentId) => {
    const current = reactionMap[commentId];

    const newType = current === "like" ? null : "like";

    setReactionMap((prev) => ({
      ...prev,
      [commentId]: newType,
    }));

    let res = await toggleCommentReaction(poetryId, commentId, "like");

    if (res.message === "Unauthorized") {
      const res2 = await createNewAccessToken();

      if (res2.message === "Session expired, please login!") {
        sessionStorage.setItem(
          "prottectedRouteUrl",
          location.pathname + location.search
        );
        navigate("/login");
        return;
      }

      if (res2.message === "Access Token is created SuccessFully") {
        res = await toggleCommentReaction(poetryId, commentId, "like");
      }
    }

    if (res.statusCode === 200) {
       setReactionMap((prev) => ({
      ...prev,
      [commentId]: null,
    }));
    }

    if (res.statusCode === 201) {
      setReactionMap((prev) => ({
     ...prev,
     [commentId]: "like",
   }));
   }

    
  }

  return (
    <div className="mt-10 w-full items-start">
      <div className="flex gap-x-3 ">
        <h2 className="sm:text-xl md:text-2xl font-bold">{totalCommentCount}</h2>
      <h2 className="sm:text-xl md:text-2xl font-bold text-[#8B2E26] mb-4">
        Review
      </h2>
      </div>
      

      {/* INPUT */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mb-2">
        <div className="flex items-center flex-1 gap-2">
          {
            authData ? (
              <img
                className="h-10 w-10 sm:h-14 sm:w-14 object-cover object-center rounded-full"
                src={authData?.avatar}
                alt="commentOwner"
              />
            ) : (
              <div className="bg-transparent">
                <CgProfile size={40} className="text-yellow-800"/>
              </div>
            )
          }

          <div onClick={handleCheckAuthStatus}>
            <input
              {...register("commentContent", {
                required: "Please write few content.",
              })}
              placeholder="Write your feedback.."
              className="w-full text-md border-b border-gray-500 px-4 py-2 outline-none"
            />
            {errors.commentContent && (
              <p className="text-red-700">
                {errors.commentContent.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-5">
          <button type="button" className="text-blue-500">Cancel</button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full">
            Submit
          </button>
        </div>
      </form>

      {/* COMMENTS */}
      <div className="space-y-2 shadow-md p-3 rounded-sm">
        {
          loading? Array.from({length:4},(_,i)=><SkeletonReply key={i}/>):
          comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onReply={addReply}
              poetryId={poetryId}
              addReplyRecursive={addReplyRecursive}
              setComments={setComments}
              // setLike={setLike}
              handleLike={handleLike}
              reactionMap={reactionMap}
              setReactionMap={setReactionMap}
            />
          ))
        }
      
      </div>
    </div>
  );
};

// ================= ITEM =================

const CommentItem = ({ comment, onReply, poetryId, addReplyRecursive, setComments,  handleLike, reactionMap, setReactionMap }) => {
  const [showReply, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(true);
  const isLiked = reactionMap[comment._id] === "like"
  const authData = useSelector((state) => state.auth.userData);

  const onSubmitReply = (data) => {
    if (!data.reply?.trim()) return;

    onReply(comment._id, data.reply);
    reset();
    setShowReply(false);
  };

  // ✅ FETCH REPLIES FIXED
  const handleShowReplies = async (commentId, comment) => {
    if (comment.replies && comment.replies.length > 0) {
      setShowReplies(!showReplies);
      return;
    }
    setLoading(true);


    let res = await getReplyComments(poetryId, commentId);

    if (res.message === "Unauthorized") {
      const res2 = await createNewAccessToken();

      if (res2.message === "Session expired, please login!") {
        sessionStorage.setItem(
          "prottectedRouteUrl",
          location.pathname + location.search
        );
        navigate("/login");
        return;
      }

      if (res2.message === "Access Token is created SuccessFully") {
        res = await  getReplyComments(poetryId, commentId);
      }
    }
    setComments((prev) => {
      let updated = [...prev];

      res?.data?.docs.forEach((com) => {
        updated = addReplyRecursive(updated, com.parentComment, com);
      });
     
setLoading(false);
      return updated;
    });

    setShowReplies(true);

    if (authData) {
      const fetchReplyCommentsRec = async () => {
        let res = await fetchReplyCommentsReactionStatus(poetryId, commentId);

        if (res.message === "Unauthorized") {
          const res2 = await createNewAccessToken();
    
          if (res2.message === "Session expired, please login!") {
            sessionStorage.setItem(
              "prottectedRouteUrl",
              location.pathname + location.search
            );
            navigate("/login");
            return;
          }
    
          if (res2.message === "Access Token is created SuccessFully") {
            res = await fetchReplyCommentsReactionStatus(poetryId, commentId);
          }
        }
  
        const map = {};
  
        res?.data?.forEach((item) => {
          map[item._id] = item.userReaction; // key = commentId
        });
  
        setReactionMap(map);
      };
  
      fetchReplyCommentsRec();
    }
  };


  return (
    <div className="flex gap-2 py-4 shadow-md px-2">
      <img
        className="h-10 w-10 rounded-full object-cover"
        src={comment?.owner?.avatar}
        alt=""
      />

      <div className="flex flex-col w-full">
        <div className="flex gap-2 text-sm text-gray-600">
          <span className="font-semibold text-black">
            {comment?.owner?.fullName}
          </span>
          <span>{Time(comment.createdAt)}</span>
        </div>

        <p className="text-gray-800 text-sm mt-1 whitespace-pre-line">
          {comment.content}
        </p>

        <div className="flex gap-4 mt-2 text-sm text-gray-600">
          <div
          className="flex"
          onClick = {()=>handleLike(comment._id)}
          >
          {
            isLiked ? (<AiFillLike className="h-6 w-6" />):(<AiOutlineLike className="h-6 w-6" />)
          } 
          </div>

          <button onClick={() => setShowReply(!showReply)}>
            Reply
          </button>
        </div>

        {/* Reply Input */}
        {showReply && (
          <form onSubmit={handleSubmit(onSubmitReply)} className="mt-3 flex flex-col gap-2">
            <input
              {...register("reply")}
              placeholder="Write your feedback.."
              className="border-b outline-none text-sm px-2"
            />

            <div className="flex justify-end gap-5">
              <button type="button" className="text-blue-500">Cancel</button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full">
                Submit
              </button>
            </div>
          </form>
        )}

        {/* SHOW REPLIES */}
        {comment.replyCount > 0 && (
          <button
            onClick={() => handleShowReplies(comment._id, comment)}
            className="text-blue-600 text-sm mt-2 text-left"
          >
            {showReplies ? "hide replies" : `seen ${comment.replyCount} reply`}
          </button>
        )}

        {/* REPLIES (RECURSIVE UI) */}
        {showReplies && (
          <div className="ml-1 mt-3 space-y-3">
            {
             loading? Array.from({length:4},(_,i)=><SkeletonReply key={i}/>):(comment.replies || []).map((r) => (
              <CommentItem
                key={r._id}
                comment={r}
                onReply={onReply}
                poetryId={poetryId}
                addReplyRecursive={addReplyRecursive}
                setComments={setComments}
                // setLike={setLike}
                // like={like}
                handleLike={handleLike}
                reactionMap={reactionMap}
               setReactionMap={setReactionMap}
                
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function SkeletonReply() {
  return (
    <div className="w-full h-[100px] rounded-md  bg-yellow-800 animate-pulse"></div>
  )
};
export default CommentSection;

