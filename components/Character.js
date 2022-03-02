import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
const Character = ({ character }) => {
  const router=useRouter();
  return (
    <div className="card col-sm-3 p-0">
      <h3 className="card-header fw-bold">{character.name}</h3>
      <div className="card-body" style={{ display: "block" }}>
        <Image
          alt={`${character.name}'s photo`}
          src={character.image}
          width={100}
          height={100}
          layout="responsive"
        />
      </div>
      <div className="card-footer d-flex flex-column">
        <span className="">
          <span className="fw-bolder text-success me-2">Gender:</span>
          {character.gender}
        </span>
        <span className="">
          <span className="fw-bolder text-success me-2">Location:</span>
          {character.location.name}
        </span>
        <span className="">
          <span className="fw-bolder text-success me-2">Origin:</span>
          {character.origin.name}
        </span>
        <span className="">
          <span className="fw-bolder text-success me-2">Status:</span>
          {character.status}
        </span>
        <span className="btn btn-sm btn-dark w-50 mt-2 text-white" onClick={()=>{
          router.push("/"+character.name);
        }}>
          Details
          <FontAwesomeIcon icon={faInfoCircle} className="ms-2" />
        </span>
      </div>
    </div>
  );
};

export default Character;
