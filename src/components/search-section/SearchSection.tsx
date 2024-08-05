import React, { useEffect, useState } from 'react'
import './SearchSection.scss'
import { UserAuth } from '@src/context/AuthContext'
import {
  getRelationships,
  searchUsers,
  sendFriendRequest
} from '@src/functions/Relationships'
import { relationshipsType, userType } from '@src/common/types'

const SearchSection: React.FC<{}> = () => {
  const { user, setLoading } = UserAuth()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResult, setSearchResult] = useState<userType[]>([])
  const [userRelation, setUserRelation] = useState<relationshipsType | null>(
    null
  )

  const requestSendClick = async (recieverId: string) => {
    try {
      setLoading(true)
      await sendFriendRequest(user.uid, recieverId)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  const friendStatus = (id: string) => {
    if (userRelation?.id === id) return 'User Itself'
    if (userRelation?.friends?.includes(id)) return 'Friend'
    if (userRelation?.requestSent?.includes(id)) return 'Request Sent'
    if (userRelation?.requestRecieved?.includes(id)) return 'Request Recieved'
    return 'Add'
  }

  useEffect(() => {
    const getSearchResult = setTimeout(async () => {
      if (searchQuery) {
        const result = await searchUsers(searchQuery)
        console.log('Search result: ', result)
        setSearchResult(result)
      } else setSearchResult([])
    }, 2000)

    return () => clearTimeout(getSearchResult)
  }, [searchQuery])

  useEffect(() => {
    if (user)
      getRelationships(user?.uid).then((relation) => {
        if (relation != undefined) {
          setUserRelation(relation)
          console.log('User relation: ', relation)
        }
      })
  }, [user])

  return (
    <>
      <div className="search-section">
        <div className="user-search">
          <div className="search-input">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchQuery(e?.target?.value)}
            />
          </div>
        </div>
        <div className="search-result">
          {searchResult.map((friend) => (
            <div key={friend.uid} className="user-item">
              {/* <img src={user.profilePic} alt="profile-pic" /> */}
              <span className="user-image">
                {friend?.profilePic ? (
                  <img src={friend?.profilePic} alt="profile-pic" />
                ) : (
                  friend.firstName[0] + ' ' + friend.lastName[0]
                )}
              </span>
              <div className="details">
                <div className="content">
                  <span className="user-email">{friend.email}</span>
                  <span className="user-name">
                    {friend.firstName + ' ' + friend.lastName}
                  </span>
                </div>
                <div className="actions">
                  {friendStatus(friend?.uid) === 'Add' ? (
                    <button onClick={() => requestSendClick(friend.uid)}>
                      Send Request
                    </button>
                  ) : friendStatus(friend.uid) === 'Request Sent' ? (
                    <button disabled>Sent</button>
                  ) : friendStatus(friend.uid) === 'Friend' ? (
                    <button>Unfriend</button>
                  ) : friendStatus(friend.uid) === 'Request Recieved' ? (
                    <>
                      <button>Accept Request</button>
                      <button>Reject Request</button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SearchSection
