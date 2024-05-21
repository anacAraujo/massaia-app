import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CDropdownHeader } from '@coreui/react'
import { cilUser, cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Navigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const { logout, currentUser} = useContext(AuthContext);

  return (
    <div>
      {currentUser ? (
        <CDropdown variant="nav-item">
        <CDropdownToggle variant='nav-item' placement="bottom-end" caret={false}>
          <CIcon icon={cilUser} size='lg'></CIcon>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">{currentUser.email}</CDropdownHeader>
          <CDropdownItem>
            <CButton onClick={logout} style={{cursor: 'pointer', margin: '0', padding: '0'}}>
              <CIcon icon={cilLockLocked} className="me-2" />
              Sair 
            </CButton>
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      ): (
        <Navigate className='nav-item nav-link' to='/login'>Login</Navigate>
      )}
    </div>
  )
}

export default AppHeaderDropdown
