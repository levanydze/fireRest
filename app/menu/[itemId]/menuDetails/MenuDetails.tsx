import styles from "./MenuDetails.module.css";
import Image from "next/image";
import { fireEachData } from "../../functions";
// import { MenuItemProps } from "../../functions";
import imageJson from "../../../../json/images.json";
import PageHeadImage from "../../../../components/anyPageHead/PageHeadImage/PageHeadImage";
import { RiArrowGoBackFill } from "react-icons/ri";
import Link from "next/link";
import NotFoundComponent from "../../../../components/x-error-loading-notFound/notFound/NotFoundComponent";

export default async function MenuDetails({ itemId }: { itemId: string }) {
  const { headImage } = imageJson;
  const data = await fireEachData(itemId);

  if (!data) {
    // Handle the case where data is null
    return <NotFoundComponent />;
  }
  return (
    <>
      <PageHeadImage image={headImage} short={true} value={data.name} />
      <Link href="./">
        <RiArrowGoBackFill className={styles.goBackIcon} />
      </Link>
      <div className={styles.menuDetailsWrapper}>
        <div className={styles.imgWrapper}>
          <Image
            priority
            src={data.image}
            alt={data.name}
            height={400}
            width={400}
          />
        </div>
        <div className={styles.infoWrapper}>
          <h2 className="title6 font1 color1">{data.name}</h2>
          <h2 className="title2 font1 textLight">
            INGREDIENTS: {data.ingredients}
          </h2>
          <p className="text1 textMedium">{data.description}</p>
          <p className="textLight title1 font1">{data.portions}</p>
          <div className={styles.specifications}>
            {data.special ? (
              <p className={`menuTags ${styles.special}`}>special</p>
            ) : null}
            {data.season ? (
              <p className={`menuTags ${styles.season}`}>season</p>
            ) : null}
            {data.vegan ? (
              <p className={`menuTags ${styles.vegan}`}>vegan</p>
            ) : null}
            {data.spicy ? (
              <p className={`menuTags ${styles.spicy}`}>spicy</p>
            ) : null}
            {data.newItem ? (
              <p className={`menuTags ${styles.newItem}`}>new</p>
            ) : null}
          </div>
          <h4 className={`font1 textLight title3 ${styles.price}`}>
            Price: {data.price} Sek
          </h4>
        </div>
      </div>
    </>
  );
}
