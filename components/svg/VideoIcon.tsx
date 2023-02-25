import { useRouter } from 'next/router'

const VideoIcon = () => {
  const { pathname } = useRouter()

  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12 6C12 7.5913 11.3679 9.11742 10.2426 10.2426C9.11742 11.3679 7.5913 12 6 12C4.4087 12 2.88258 11.3679 1.75736 10.2426C0.632141 9.11742 0 7.5913 0 6C0 4.4087 0.632141 2.88258 1.75736 1.75736C2.88258 0.632141 4.4087 0 6 0C7.5913 0 9.11742 0.632141 10.2426 1.75736C11.3679 2.88258 12 4.4087 12 6ZM2 6C2 7.06087 2.42143 8.07828 3.17157 8.82843C3.92172 9.57857 4.93913 10 6 10C7.06087 10 8.07828 9.57857 8.82843 8.82843C9.57857 8.07828 10 7.06087 10 6C10 4.93913 9.57857 3.92172 8.82843 3.17157C8.07828 2.42143 7.06087 2 6 2C4.93913 2 3.92172 2.42143 3.17157 3.17157C2.42143 3.92172 2 4.93913 2 6Z'
        fill={`${pathname.split('/')[1] === 'movies' ? '#E31221' : 'white'}`}
      />
      <path
        d='M18 12H19C19.9702 11.9999 20.9073 12.3524 21.637 12.9919C22.3666 13.6313 22.8389 14.5142 22.966 15.476L29.186 12.712C29.4905 12.5763 29.824 12.5189 30.1563 12.545C30.4886 12.571 30.8091 12.6797 31.0887 12.8611C31.3683 13.0426 31.5981 13.291 31.7573 13.5838C31.9164 13.8767 31.9999 14.2047 32 14.538V29.462C31.9997 29.795 31.9163 30.1228 31.7572 30.4154C31.5982 30.708 31.3685 30.9563 31.0892 31.1376C30.8099 31.319 30.4897 31.4278 30.1577 31.454C29.8257 31.4803 29.4924 31.4232 29.188 31.288L22.966 28.524C22.8389 29.4858 22.3666 30.3687 21.637 31.0081C20.9073 31.6476 19.9702 32.0001 19 32H4C2.93913 32 1.92172 31.5786 1.17157 30.8284C0.421427 30.0783 0 29.0609 0 28V16C0 14.9391 0.421427 13.9217 1.17157 13.1716C1.92172 12.4214 2.93913 12 4 12H18ZM30 14.54L23 17.65V26.35L30 29.462V14.54ZM2 16V28C2 28.5304 2.21071 29.0391 2.58579 29.4142C2.96086 29.7893 3.46957 30 4 30H19C19.5304 30 20.0391 29.7893 20.4142 29.4142C20.7893 29.0391 21 28.5304 21 28V16C21 15.4696 20.7893 14.9609 20.4142 14.5858C20.0391 14.2107 19.5304 14 19 14H4C3.46957 14 2.96086 14.2107 2.58579 14.5858C2.21071 14.9609 2 15.4696 2 16Z'
        fill={`${pathname.split('/')[1] === 'movies' ? '#E31221' : 'white'}`}
      />
      <path
        d='M18 12C19.5913 12 21.1174 11.3679 22.2426 10.2426C23.3679 9.11742 24 7.5913 24 6C24 4.4087 23.3679 2.88258 22.2426 1.75736C21.1174 0.632141 19.5913 0 18 0C16.4087 0 14.8826 0.632141 13.7574 1.75736C12.6321 2.88258 12 4.4087 12 6C12 7.5913 12.6321 9.11742 13.7574 10.2426C14.8826 11.3679 16.4087 12 18 12ZM14 6C14 4.93913 14.4214 3.92172 15.1716 3.17157C15.9217 2.42143 16.9391 2 18 2C19.0609 2 20.0783 2.42143 20.8284 3.17157C21.5786 3.92172 22 4.93913 22 6C22 7.06087 21.5786 8.07828 20.8284 8.82843C20.0783 9.57857 19.0609 10 18 10C16.9391 10 15.9217 9.57857 15.1716 8.82843C14.4214 8.07828 14 7.06087 14 6Z'
        fill={`${pathname.split('/')[1] === 'movies' ? '#E31221' : 'white'}`}
      />
    </svg>
  )
}

export default VideoIcon
