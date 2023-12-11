import { CreateNote, NavBar, NoteUICollection, UpdateNote } from './ui-components'
import { NoteCreateForm, NoteUpdateForm} from './ui-components'

import { useState } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'

function App ({ signOut }) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [updateNote, setUpdateNote] = useState()
  return (
    <>
      <NavBar
        marginBottom='20px' width='100%'
        overrides={{
          Button31632483: { onClick: () => setShowCreateModal(true) },
          Button31632487: {
            onClick: async () => {
              signOut()
            }
          }
        }}
      />
      <div className='container'>
        <NoteUICollection overrideItems={({ item, idx }) => {
          return {
            overrides: {
              EditButton: {
                as: 'button',
                onClick: () => {
                  setShowUpdateModal(true)
                  setUpdateNote(item)
                }
              }
            }
          }
        }}
        />
      </div>
      <div className='modal' style={{ display: showCreateModal === false && 'none' }}>
        <NoteCreateForm overrides={{
        SubmitButton: {
          as: 'button',
          onClick: () => setShowCreateModal(false)
        },
        CancelButton: {
          as: 'button',
          onClick: () => setShowCreateModal(false)
        }
      }}
      />
      </div>
      <div className='modal' style={{ display: showUpdateModal === false && 'none' }}>
        <NoteUpdateForm
          note={updateNote} overrides={{
            SubmitButton: {
              as: 'button',
              onClick: () => setShowUpdateModal(false)
            },
            CancelButton: {
              as: 'button',
              onClick: () => setShowUpdateModal(false)
            }
          }}
        />
      </div>
    </>
  )
}


export default withAuthenticator(App);
