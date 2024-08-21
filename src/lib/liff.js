import liff from '@line/liff';


export async function initializeLiff() {
    if (typeof window === 'undefined') {
        return;
    }

    await liff
        .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
        .then(() => {
            console.log("liff.init() done");
            // setLiffObject(liff);
        })
        .catch((error) => {
            console.log(`liff.init() failed: ${error}`);
            if (!process.env.LIFF_ID) {
                console.info(
                "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
                );
            }
            console.error(error);
        })

}

export function forceLogin() {
    if (process.env.SKIP_LINE_LOGIN) {
        return;
    }
    if (liff.isLoggedIn()) {
        return;
    }
    liff.login();
}

export async function getProfile() {
    try {
        if (process.env.IS_PRODUCTION == "true") {
            return await liff.getProfile();
        } else {
            return {
                "userId": "Uc9bc1b1029de31374527b0df38084077",
                "displayName": "助音 (ジョン)",
                "pictureUrl": "https://profile.line-scdn.net/0hLpvyGVYZE19bAANu_CZtICtQEDV4cUpNIzVfPjsASWtlZVAAcTVUOz5VT2xjMgZaJ2BfbDwFGWhXE2Q5RVbva1wwTm5nNFALf2ZZvw"
            }
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
}