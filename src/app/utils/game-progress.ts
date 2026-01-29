// Educational content for each level
export interface LevelLesson {
    title: string;
    content: string;
    keyPoints: string[];
}

export const LEVEL_LESSONS: Record<number, LevelLesson> = {
    1: {
        title: "Chủ Nghĩa Duy Vật",
        content: "Vật chất tồn tại khách quan, độc lập với ý thức con người. Vật chất có trước, ý thức có sau. Ý thức là sản phẩm của vật chất phát triển đến trình độ cao, là thuộc tính của bộ não con người - cơ quan vật chất đặc biệt cao cấp.",
        keyPoints: [
            "Vật chất tồn tại khách quan, không phụ thuộc ý thức",
            "Vật chất có trước, ý thức có sau",
            "Ý thức là sản phẩm của vật chất phát triển",
            "Ý thức phản ánh vật chất"
        ]
    },
    2: {
        title: "Vận Động - Thuộc Tính Của Vật Chất",
        content: "Vận động là phương thức tồn tại của vật chất. Không có vật chất đứng yên tuyệt đối. Mọi sự vật, hiện tượng đều trong trạng thái vận động, biến đổi không ngừng. Vận động có nhiều hình thức: cơ học, vật lý, hóa học, sinh học, xã hội.",
        keyPoints: [
            "Vận động là phương thức tồn tại của vật chất",
            "Không có vật chất đứng yên tuyệt đối",
            "Vận động mang tính khách quan",
            "Có nhiều hình thức vận động khác nhau"
        ]
    },
    3: {
        title: "Quy Luật Lượng - Chất",
        content: "Sự tích lũy về lượng đến một giới hạn nhất định sẽ dẫn đến bước nhảy về chất. Đây là quy luật phổ biến của sự phát triển. Quá trình phát triển diễn ra từ từ về lượng, nhưng khi đạt đến điểm tới hạn sẽ có bước nhảy đột biến về chất.",
        keyPoints: [
            "Tích lũy về lượng dẫn đến thay đổi về chất",
            "Bước nhảy là giai đoạn chuyển từ chất cũ sang chất mới",
            "Sự phát triển là quá trình lượng-chất liên tục",
            "Ví dụ: nước sôi ở 100°C, cách mạng xã hội"
        ]
    },
    4: {
        title: "Quy Luật Mâu Thuẫn",
        content: "Mâu thuẫn là nguồn gốc, động lực của sự vận động và phát triển. Mọi sự vật đều chứa đựng những mặt đối lập, vừa đấu tranh vừa thống nhất với nhau. Đấu tranh giữa các mặt đối lập là động lực thúc đẩy sự phát triển.",
        keyPoints: [
            "Mâu thuẫn là động lực của sự phát triển",
            "Các mặt đối lập vừa đấu tranh vừa thống nhất",
            "Mâu thuẫn nội bộ là nguyên nhân quyết định",
            "Giải quyết mâu thuẫn thúc đẩy tiến bộ"
        ]
    },
    5: {
        title: "Quy Luật Phủ Định Của Phủ Định",
        content: "Sự phát triển diễn ra theo hình thức vòng xoắn ốc: phủ định cái cũ nhưng kế thừa những yếu tố tích cực, rồi lại bị phủ định ở trình độ cao hơn. Cái mới ra đời trên cơ sở kế thừa và phát triển cái cũ, không phải phá bỏ hoàn toàn.",
        keyPoints: [
            "Phủ định biện chứng: vừa phủ định vừa kế thừa",
            "Sự phát triển theo hình xoắn ốc",
            "Cái mới kế thừa tinh hoa của cái cũ",
            "Phủ định của phủ định đưa lên trình độ cao hơn"
        ]
    },
    6: {
        title: "Thực Tiễn Và Chân Lý",
        content: "Thực tiễn là toàn bộ hoạt động vật chất - cảm tính có mục đích, mang tính lịch sử - xã hội của con người nhằm cải biến tự nhiên và xã hội. Thực tiễn là cơ sở, động lực, mục đích của nhận thức và là tiêu chuẩn của chân lý. Chỉ có đem những tri thức thu nhận được kiểm nghiệm qua thực tiễn mới xác định được tính đúng đắn của chúng.",
        keyPoints: [
            "Thực tiễn là tiêu chuẩn duy nhất của chân lý",
            "Học đi đôi với hành, lý luận gắn liền với thực tiễn",
            "Thực tiễn vận động và phát triển không ngừng",
            "Tránh bệnh giáo điều, xa rời thực tiễn"
        ]
    },
    7: {
        title: "Bản Chất Và Hiện Tượng",
        content: "Bản chất là tổng hợp tất cả những mặt, những mối liên hệ tất nhiên tương đối ổn định bên trong sự vật. Hiện tượng là sự biểu hiện ra bên ngoài của bản chất. Bản chất bao giờ cũng bộc lộ qua hiện tượng, còn hiện tượng bao giờ cũng là sự biểu hiện của một bản chất nhất định. Tuy nhiên, hiện tượng không phải bao giờ cũng phản ánh đúng bản chất (có thể là hiện tượng giả).",
        keyPoints: [
            "Bản chất quyết định hiện tượng",
            "Hiện tượng là biểu hiện của bản chất",
            "Đừng đánh giá sự vật chỉ qua vẻ bề ngoài",
            "Phải tìm hiểu bản chất sâu xa bên trong"
        ]
    },
    8: {
        title: "Tất Yếu Và Tự Do",
        content: "Tất yếu là cái chi phối sự vật buộc sự vật phải phát triển thế này hay thế khác. Tự do là khả năng con người làm chủ được bản thân và thế giới xung quanh trên cơ sở nhận thức được cái tất yếu. Tự do không phải là muốn làm gì thì làm, mà là hành động dựa trên sự hiểu biết về quy luật.",
        keyPoints: [
            "Tự do là sự nhận thức được cái tất yếu",
            "Tự do gắn liền với trách nhiệm",
            "Hành động trái quy luật sẽ bị trừng phạt",
            "Hiểu quy luật giúp con người chủ động (tự do)"
        ]
    }
};

// Progress tracking interfaces
export interface LevelStats {
    bestTime: number;  // in seconds (elapsed + penalty)
    completedCount: number;
    lastPlayed?: string;  // ISO date string
}

export interface GameProgress {
    unlockedLevels: number[];
    levelStats: Record<number, LevelStats>;
}

export interface LevelResult {
    level: number;
    sentence: string;
    elapsedTime: number;
    penaltyTime: number;
    totalTime: number;
}

// LocalStorage key
export const STORAGE_KEY = 'philosophical-snake-progress';

// LocalStorage utilities
export function loadProgress(): GameProgress {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Failed to load progress:', error);
    }

    // Default: only level 1 unlocked
    return {
        unlockedLevels: [1],
        levelStats: {}
    };
}

export function saveProgress(progress: GameProgress): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
        console.error('Failed to save progress:', error);
    }
}

export function unlockNextLevel(currentProgress: GameProgress, completedLevel: number): GameProgress {
    const nextLevel = completedLevel + 1;
    // Updated to support up to 8 levels
    if (nextLevel <= 8 && !currentProgress.unlockedLevels.includes(nextLevel)) {
        return {
            ...currentProgress,
            unlockedLevels: [...currentProgress.unlockedLevels, nextLevel].sort((a, b) => a - b)
        };
    }
    return currentProgress;
}

export function updateLevelStats(
    currentProgress: GameProgress,
    level: number,
    totalTime: number
): GameProgress {
    const currentStats = currentProgress.levelStats[level];
    const isNewRecord = !currentStats || totalTime < currentStats.bestTime;

    return {
        ...currentProgress,
        levelStats: {
            ...currentProgress.levelStats,
            [level]: {
                bestTime: isNewRecord ? totalTime : (currentStats?.bestTime || totalTime),
                completedCount: (currentStats?.completedCount || 0) + 1,
                lastPlayed: new Date().toISOString()
            }
        }
    };
}

export function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
}
