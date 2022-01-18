import styled, { keyframes } from 'styled-components'
import colors from '../../utils/colors'

const SkeletonLoading = keyframes`
  from {
    background-color: hsl(200, 20%, 70%);
  }
  to {
    background-color: hsl(200, 20%, 95%);
  }
`
const SkeletonPostWrapper = styled.div`
  padding: 36px 0 21px;
  border-bottom: solid 1px ${colors.lightgrey};
  .skeleton {
    opacity: 0.7;
    animation: ${SkeletonLoading} 1s linear infinite alternate;
  }
`
const SkeletonUserDisplay = styled.div`
  display: flex;
  gap: 11px;
  margin-bottom: 15px;
`
const SkeletonUserPicture = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`
const SkeletonUserInfo = styled.div``
const SkeletonUsername = styled.div`
  width: 143px;
  height: 16px;
  margin-bottom: 5px;
  border-radius: 40px;
`
const SkeletonSubInfo = styled.div`
  width: 114px;
  height: 15px;
  border-radius: 40px;
`
const SkeletonPostText = styled.div`
  margin-bottom: 20px;
`
const SkeletonPostTitle = styled.div`
  width: 317px;
  height: 57px;
  margin-bottom: 9px;
  border-radius: 40px;
`
const SkeletonPostContent = styled.div`
  width: 317px;
  height: 40px;
  border-radius: 40px;
`
const SkeletonInteractions = styled.div`
  display: flex;
  justify-content: space-between;
`
const SkeletonLikes = styled.div`
  width: 62px;
  height: 36px;
  border-radius: 40px;
`
const SkeletonComments = styled.div`
  width: 62px;
  height: 36px;
  border-radius: 40px;
`
export const HomepageLoading = () => {
  const arrayLoop = [0, 1, 2, 3, 4, 5, 6]
  return arrayLoop.map((elem, index) => {
    return (
      <SkeletonPostWrapper key={index + '-' + elem}>
        <SkeletonUserDisplay>
          <SkeletonUserPicture className='skeleton' />
          <SkeletonUserInfo>
            <SkeletonUsername className='skeleton' />
            <SkeletonSubInfo className='skeleton' />
          </SkeletonUserInfo>
        </SkeletonUserDisplay>
        <SkeletonPostText>
          <SkeletonPostTitle className='skeleton' />
          <SkeletonPostContent className='skeleton' />
        </SkeletonPostText>
        <SkeletonInteractions>
          <SkeletonLikes className='skeleton' />
          <SkeletonComments className='skeleton' />
        </SkeletonInteractions>
      </SkeletonPostWrapper>
    )
  })
}
