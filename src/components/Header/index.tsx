import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { HeaderContainer } from "./styles"

export const Header = () => {
  return (
    <div>
      <HeaderContainer>
        <span>
          <img src={logo} alt="Logo Rocketseat: dois triâgulos verdes sobrepostos" />
        </span>
        <nav>
          <NavLink to="/" title="Timer">
            <Timer size={24} />
          </NavLink>
          <NavLink to="history" title="Histórico">
            <Scroll size={24} />
          </NavLink>
        </nav>
      </HeaderContainer>
    </div>
  )
}