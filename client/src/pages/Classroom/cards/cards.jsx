import './card.css'
import { NavLink } from 'react-router-dom';

const Card = (props) => {
  const Rimge = props.image;
  const title = props.userClassesData.name + "  (" + props.userClassesData.courseCode + ")";
  return (
    <div className="container cardClass">
      <div className="card" style={{ width: '18rem' }}>
        <img className="card-img-top" src={Rimge} alt="Card image cap" />
        <div className="card-body">
          <h5>{props.userClassesData.name}<span className="badge data badge-primary">{ props.userClassesData.courseCode }</span></h5>
          <div className="card-body">
            <ol>
              {
                props.notification.map((notification) => {
                  return <li className='list' key={notification.toString()}>{notification}<span style={{ float: 'right' }}><i className="fas fa-bell bell_ico"></i></span></li>
                })
              }
            </ol>
          </div>

          <NavLink className="nav-link btn btn-primary" to={{
            pathname: "/class",
            search: `?id=${props.index}`,
            hash: `#${props.userClassesData.name}`,
          }} exact style={{ color: 'white' }}>
          Open Class
          </NavLink>

        </div>
        <div className="card-footer text-muted">
          Invite Code {props.userClassesData.inviteCode}
       </div>
      </div>
    </div>
  )
}
export default Card;