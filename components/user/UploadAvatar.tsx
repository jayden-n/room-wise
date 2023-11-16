"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UploadAvatar = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const [avatar, setAvatar] = useState("");
	const [avatarPreview, setAvatarPreview] = useState(
		"/images/default_avatar.jpg",
	);

	// get current user info
	const { user } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (user?.avatar) {
			setAvatarPreview(user?.avatar?.url);
		}
	}, [user]);

	const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		// returns a FileList array on a file type input object
		const files = Array.from(e.target.files || []);

		const reader = new FileReader();

		// thanks to: https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readyState
		reader.onload = () => {
			// 2: DONE (The operation is complete)
			if (reader.readyState === 2) {
				setAvatar(reader.result as string);
				setAvatarPreview(reader.result as string);
			}
		};

		// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
		// representing the file's data as a base64 encoded string
		reader.readAsDataURL(files[0]);
	};

	return (
		<div className='row wrapper'>
			<div className='col-10 col-lg-8'>
				<form
					className='shadow rounded bg-body'
					action='/submit-avatar-upload'
					method='POST'
				>
					<h2 className='mb-4'>Upload Avatar</h2>

					<div className='form-group'>
						<div className='d-flex align-items-center'>
							<div className='me-3'>
								<figure className='avatar item-rtl'>
									<img
										src={avatarPreview}
										className='rounded-circle'
										alt='image'
									/>
								</figure>
							</div>
							<div className='input-foam'>
								<label className='form-label' htmlFor='customFile'>
									Choose Avatar
								</label>
								<input
									// image file type...
									type='file'
									name='avatar'
									className='form-control'
									id='customFile'
									accept='images/*'
									onChange={onChange}
								/>
							</div>
						</div>
					</div>

					<button type='submit' className='btn form-btn w-100 py-2'>
						Upload
					</button>
				</form>
			</div>
		</div>
	);
};

export default UploadAvatar;
